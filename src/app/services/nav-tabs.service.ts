import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationLink } from '../interfaces/navigation-item.interface';
import { navigationData } from './navigation-data';

export interface TabLink {
    label: string;
    route: string | any;
    index: number;
    id: string;
}

@Injectable({
    providedIn: 'root'
})
export class NavTabsService {
    // defaultLink: TabLink = { index: 0, label: 'Home', route: '/master-general', id: 'mastergeneral' };
    // defaultLink: TabLink = { index: 0, label: 'Home', route: '/homepage', id: 'homepage' };
    defaultLink: TabLink = null;
    defaultGroup: string = '';
    navLinks: BehaviorSubject<TabLink[]> = new BehaviorSubject<TabLink[]>([]);
    activedTab: BehaviorSubject<TabLink> = new BehaviorSubject<TabLink>(this.defaultLink);
    idGrpNav: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultGroup);
    keyNavTab = 'info_tabs';
    items = navigationData;

    constructor() {}

    setDefaultLink(){
        const navLinks = this.navLinks.getValue();
        this.defaultLink = navLinks.length> 0? navLinks[navLinks.length-1]: null;        
    }

    createIframe(item: TabLink) {
        let wrapPage = document.getElementById('wrap-page') as HTMLDivElement;
        if (wrapPage) {
            let exist = document.getElementById(item.id);
            if (!exist) {
                let iframe = document.createElement('iframe') as HTMLIFrameElement;
                iframe.id = item.id;
                iframe.src = item.route;
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.display = 'block';
                wrapPage.appendChild(iframe);
            }
        }
    }

    activedDefaultLink() {
        let data = JSON.parse(localStorage.getItem(this.keyNavTab));
        let navLinks: TabLink[] = data ? (data['navLinks'] as TabLink[]) : [];
        let activedTab: TabLink = data ? (data['activedTab'] as TabLink) : ({} as TabLink);

        if (navLinks.length > 0) {
            this.createIframe(activedTab);
            this.navLinks.next(navLinks);
            this.activedTab.next(activedTab);
            this.getActiveGroup(activedTab);
        }
        else {
            // this.createIframe(this.defaultLink);
            this.navLinks.next([]);
            this.activedTab.next(null);
        }
        this.savedLocalStorage();
    }

    addNewTab(item: NavigationLink) {
        let wrapPage = document.getElementById('wrap-page') as HTMLDivElement;
        let navLinks = this.navLinks.getValue();
        let existTab = navLinks.find(x => x.id === item.id);

        let navLink = {
            index: navLinks.length,
            label: item.label,
            route: item.route,
            id: item.id
        };

        /** check Active  */
        if (wrapPage) {
            let pages = wrapPage.getElementsByTagName('iframe');
            for (let i = 0; i < pages.length; i++) {
                if (pages[i].getAttribute('id') === navLink.id) {
                    pages[i].style.display = 'block';
                } else {
                    pages[i].style.display = 'none';
                }
            }
        }

        if (!existTab) {
            navLinks.push(navLink);
            this.activedTab.next(navLink);
            this.navLinks.next(navLinks);
        } else {
            this.activedTab.next(existTab);
        }

        this.createIframe(navLink);
        this.savedLocalStorage();
    }

    getActiveGroup(currentLink: TabLink) {
        let navOpen: NavigationLink;
        navigationData.map((x: NavigationLink) => {
            if (x.children) {
                x.isOpen = false;
                x.children.map((y: NavigationLink) => {
                    if (navOpen) return;
                    if (y.id === currentLink.id) {
                        navOpen = x;
                    }
                });
            }
        });
        this.idGrpNav.next(currentLink.id !== 'homepage' ? navOpen.id : '');
    }

    changeTab(indexTab: number) {
        const currentLink = this.navLinks.getValue()[indexTab];
        let wrapPage = document.getElementById('wrap-page') as HTMLDivElement;
        let pages = wrapPage.getElementsByTagName('iframe');
        let hasPage = false;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].getAttribute('id') === currentLink.id) {
                pages[i].style.display = 'block';
                this.activedTab.next(currentLink);
                hasPage = true;
            } else {
                pages[i].style.display = 'none';
            }
        }
        if (!hasPage) {
            this.activedTab.next(currentLink);
            this.createIframe(currentLink);
        }
        this.getActiveGroup(currentLink);
        this.savedLocalStorage();
    }

    closeTab(item: TabLink) {
        let navLinks = this.navLinks.getValue();
        const newList: TabLink[] = [];
        let index = 0;
        navLinks.map((link: TabLink) => {
            if (link.index !== item.index) {
                link.index = index;
                newList.push(link);
                index++;
            }
        });
        
        this.navLinks.next(newList);
        this.setDefaultLink();
        this.activedTab.next(this.defaultLink);
        document.getElementById(item.id).remove();
        setTimeout(() => {
            if(this.activedTab.getValue()) document.getElementById(this.defaultLink.id).style.display = 'block';
        }, 300);
        this.savedLocalStorage();
    }

    closeCurrentTab() {
        let data = JSON.parse(localStorage.getItem(this.keyNavTab));
        let navLinks: TabLink[] = data ? (data['navLinks'] as TabLink[]) : [];
        let activedTab: TabLink = data ? (data['activedTab'] as TabLink) : ({} as TabLink);

        navLinks = navLinks.filter(x => x.id !== activedTab.id);
        this.navLinks.next(navLinks);
        this.defaultLink = navLinks.length> 0? navLinks[navLinks.length-1]: null;        
        this.activedTab.next(this.defaultLink);

        this.savedLocalStorage();

        let wrapPage = window.parent.document.getElementById('wrap-page') as HTMLDivElement;
        if (wrapPage) {
            let pages = wrapPage.getElementsByTagName('iframe');
            for (let i = 0; i < pages.length; i++) {
                if(activedTab){
                    if (pages[i].getAttribute('id') === activedTab.id) {
                        pages[i].remove();
                    } else {
                        pages[i].style.display = 'none';
                    }
                }
            }
        }
    }

    CloseAll() {
        this.navLinks.next([]);
        this.activedTab.next(null);

        let wrapPage = document.getElementById('wrap-page') as HTMLDivElement;
        let pages = wrapPage.getElementsByTagName('iframe');
        for (let i = pages.length - 1; i >= 0; i--) {
            if(this.defaultLink){
                if (pages[i].getAttribute('id') === this.defaultLink.id) {
                    pages[i].style.display = 'block';
                } else {
                    pages[i].remove();
                }
            }else{
                pages[i].remove();
            }          
        }
        this.savedLocalStorage();
    }

    savedLocalStorage() {
        let data = {
            navLinks: this.navLinks.getValue(),
            activedTab: this.activedTab.getValue()
        };
        localStorage.removeItem(this.keyNavTab);
        localStorage.setItem(this.keyNavTab, JSON.stringify(data));
    }

    removeLocalStorage() {
        localStorage.removeItem(this.keyNavTab);
        if(this.defaultLink){
            this.navLinks.next([this.defaultLink]);
            this.activedTab.next(this.defaultLink);
            this.idGrpNav.next(this.defaultGroup);
        }else{
            this.navLinks.next([]);
            this.activedTab.next(this.defaultLink);
            this.idGrpNav.next(this.defaultGroup);
        }
    }
}
