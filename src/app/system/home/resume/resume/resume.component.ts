import { style } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { VMGetJobDto } from 'src/app/core/model/jobs/model/Jobs';
import { VMGetCurrentUser } from 'src/app/core/model/user/model/model';
import { UserService } from 'src/app/core/model/user/User.service';
import { ApiAuthenService } from 'src/app/services/api-authen.service';

declare var $: any;

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit, AfterViewInit {
  imagePreview: string;
  constructor(
    private apiAuthenService: ApiAuthenService,
    private userService: UserService
  ) {}
  currentUser: VMGetCurrentUser = {
    id: '',
    fullName: '',
    firstName: '',
    lastName: '',
    roleName: '',
    experience: '',
    nameMajor: '',
    idMajor: 0,
    urlAvatar: '',
    phoneNumber: '',
    address: '',
    email: '',
  };
  desiredJob : string; 
  ngAfterViewInit(): void {
    $(document).ready(() => {
      $(document).foundation();
      $('form').parsley();
      $(document).on(
        'mouseenter',
        '.cv__info:has(.btn-block)',
        function (data: any) {
          $(data.target).find('.btn-block').css('opacity', 1);
        }
      );

      $(document).on(
        'mouseleave',
        '.cv__info:has(.btn-block)',
        function (data: any) {
          $(data.target).find('.btn-block').css('opacity', 0);
        }
      );
      $(document).on(
        'click',
        '.cv__info :button:nth-child(2)',
        function (data: any) {
          console.log(data);
          $(data.target).closest('.cv__info').remove();
        }
      );
    });
  }

  ngOnInit() {
    this.getCurrentUser();
  }
  data = localStorage.getItem('data');
  _LIST_DATA: VMGetJobDto[] = [];
  getCurrentUser() {
    const dataJson = JSON.parse(this.data || '');
    this.apiAuthenService
      .RequestGetCurrentUser(dataJson.data.id)
      .subscribe((data: any) => {
        this.currentUser = data[0];
      });
  }

  // print() {
  //   console.log('Goto print');
  //   // change the default width of the paper
  //   document.getElementById('paper')!.setAttribute("style", "width:1000px");

  //   const filename = 'Donwload_Resume.pdf';
  //   const a4Width = 210.0015555555555;  // paper Standard Width
  //   const a4Height = 297.0000833333333; // paper Standard Height
  //   const divWidth = document.getElementById('paper')!.offsetWidth;

  //   // get paper color side
  //   const paperSide = document.getElementById('paper-side');

  //   // calculate the color side  height
  //   const paperSideHeight = (a4Height / a4Width) * divWidth;

  //   // change the default height of the paper
  //   paperSide!.setAttribute("style", "min-height:" + paperSideHeight + "px");

  //   const paper = document.getElementById('paper');
  //   const divHeight = paper!.offsetHeight;

  //   html2canvas(paper!, {
  //     height: divHeight,
  //     width: divWidth,
  //     scrollY: -window.scrollY,
  //     scale: 1,
  //     allowTaint: true,
  //     useCORS: true,
  //     logging: false
  //   }).then(canvas => {
  //     let pdf = new jsPDF('p', 'mm', 'a4');
  //     const width = pdf.internal.pageSize.getWidth();
  //     const height = (divHeight / divWidth) * width; // ratio

  //     pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', -2, 0, width, height);

  //     // pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', -2, 0, 211, pdf.internal.pageSize.getHeight());
  //     pdf.save(filename);

  //     // restore the default height and width
  //     paperSide!.removeAttribute("style");
  //     document.getElementById('paper')!.removeAttribute("style");
  //   });
  // }

  listOption: any[] = [
    {
      name: 'Experiences',
      icon: 'fa fa-briefcase',
      href: 'experience',
    },
    {
      name: 'Projects',
      icon: 'fas fa-box-open',
      href: 'project',
    },
    {
      name: 'Educations',
      icon: 'fas fa-university',
      href: 'education',
    },
    {
      name: 'Skills',
      icon: 'fas fa-wrench',
      href: 'skills',
    },
    {
      name: 'Languages',
      icon: 'fa fa-language',
      href: 'languages',
    },
    {
      name: 'Interests',
      icon: 'fas fa-plus',
      href: 'interests',
    },
  ];

  async print() {
    console.log('Goto print');
    // change the default width of the paper
    // document.getElementById('paper')!.setAttribute('style', 'width:99%');

    const filename = 'Donwload_Resume.pdf';
    const a4Width = 210.0015555555555; // paper Standard Width
    const a4Height = 297.0000833333333; // paper Standard Height
    const divWidth = document.getElementById('paper')!.offsetWidth;

    // get paper color side
    const paperSide = document.getElementById('paper-side');

    // calculate the color side  height
    const paperSideHeight = (a4Height / a4Width) * divWidth;

    // change the default height of the paper
    // paperSide!.setAttribute("style", "min-height:" + paperSideHeight + "px");

    const paper = document.getElementById('paper');
    const divHeight = paper!.offsetHeight;

    await html2canvas(paper!, {
      height: divHeight,
      width: divWidth,
      scale: 5,
      allowTaint: true,
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      let pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      let pageHeight = pdf.internal.pageSize.height;
      let imgHeight = (canvas.height * width) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(
        canvas.toDataURL('image/jpeg'),
        'JPEG',
        0,
        0,
        width,
        imgHeight
      );
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/jpeg'),
          'JPEG',
          0,
          position,
          width,
          imgHeight
        );
        heightLeft -= pageHeight;
      }
      pdf.save(filename);
      paperSide!.removeAttribute('style');
      document.getElementById('paper')!.removeAttribute('style');
    });
  }

  onFileChange(e: any) {
    const file = (event.target as HTMLInputElement).files[0];

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  listColor = [
    {
      name: 'Red',
      value: '#f44336',
    },
    {
      name: 'Pink',
      value: '#e91e63',
    },
    {
      name: 'Purple',
      value: '#9c27b0',
    },
    {
      name: 'Deep Purple',
      value: '#673ab7',
    },
  ];
  changeColor(color: string) {
    let allLabel: any[] = [];
    console.log(color);
    // change color + tag color
    console.log(document.getElementById('paper-side')!);
    document
      .getElementById('paper-side')!
      .setAttribute('style', 'background-color:' + color);
    allLabel.push(document.getElementsByClassName('label')!);
    console.log(allLabel[0]);
    for (let i = 0; i < allLabel[0].length; i++) {
      allLabel[0][i].setAttribute('style', 'background-color:' + color);
    }
  }
  option: string;
  openOption(option: any) {
    switch (option) {
      case 'experience':
        this.option = 'experience';
        break;
      case 'project':
        this.option = 'project';
        break;
      case 'education':
        this.option = 'education';
        break;
      case 'skills':
        this.option = 'skills';
        break;
      case 'languages':
        this.option = 'languages';
        break;
      case 'interests':
        this.option = 'interests';
        break;
      default:
        break;
    }
  }
  generateDelBtn() {
    console.log('generateDelBtn');
    // <button class="icon"><i class="fas fa-trash"></i></button>
    let i = document.createElement('i');
    let button = document.createElement('button');
    button.append(i);

    button.classList.add('icon');
    i.classList.add('fas');
    i.classList.add('fa-trash');

    return button;
  }

  generateEditBtn() {
    console.log('generateEditBtn');
    // <button class="icon"><i class="fas fa-paint-brush"></i></button>
    let i = document.createElement('i');
    let button = document.createElement('button');
    button.append(i);

    button.classList.add('icon');
    i.classList.add('fas');
    i.classList.add('fa-paint-brush');

    return button;
  }
  generateBtnBlock() {
    console.log('generateBtnBlock');
    // <div class="btn-block">...</div>
    let divTag = document.createElement('div');
    divTag.append(this.generateEditBtn());
    divTag.append(this.generateDelBtn());

    divTag.classList.add('btn-block');

    return divTag;
  }

  addWebSite(inputName: string, $event: any) {
    console.log('addWebSite');
    // get elements
    let input = document.getElementById('input-' + inputName) as any;
    $event.preventDefault();
    let divTag = document.createElement('div');
    divTag.classList.add('cv__info');
    let iTag = document.createElement('i');
    iTag.classList.add('fas');
    iTag.classList.add('fa-globe-europe');

    // create link tag
    // get the element to write inside

    let linkTag = document.createElement('a');
    let linkText = document.createTextNode(input.value);

    linkTag.appendChild(linkText);
    linkTag.title = input.value;
    linkTag.href = input.value;
    let to = document.getElementById('cv__' + inputName);
    to?.appendChild(divTag);
    divTag.appendChild(iTag);
    divTag.appendChild(linkTag);
    divTag.appendChild(this.generateBtnBlock());
  }

  addSocialMedia(inputName: string, $event: any) {
    console.log('addSocialMedia');
    // get elements
    let input = document.getElementById('input-' + inputName) as any;
    let select = document.getElementById('select-' + inputName) as any;

    $event.preventDefault();
    if (
      $('#input-' + inputName)
        .parsley()
        .isValid() &&
      $('#select-' + inputName)
        .parsley()
        .isValid() &&
      input.value !== ''
    ) {
      let divTag = document.createElement('div');
      divTag.classList.add('cv__info');

      // create <i class="fas"> &#x....; </i>
      let iTag = document.createElement('i');
      iTag.classList.add('fab');
      iTag.textContent = select.value;

      // create link tag
      let linkTag = document.createElement('a');
      let linkText = document.createTextNode(input.value);

      linkTag.appendChild(linkText);
      linkTag.title = input.value;
      linkTag.href = input.value;

      // get the element to write inside
      let to = document.getElementById('cv__' + inputName);
      divTag.appendChild(iTag);
      divTag.appendChild(linkTag);
      divTag.appendChild(this.generateBtnBlock());
      to!.appendChild(divTag);
    }
  }

  addExperience(blockID: string, $event: any) {
    $event.preventDefault();
    blockID = 'experience';
    let roleInput = document.getElementById(blockID + '_role') as any;
    let companyInput = document.getElementById(blockID + '_company') as any;
    let fromInput = document.getElementById(blockID + '_from') as any;
    let toInput = document.getElementById(blockID + '_to') as any;
    let descriptionInput = document.getElementById(
      blockID + '_description'
    ) as any;
    let tagsInput = document.getElementById(blockID + '_tags') as any;
    // create <h2> ... </h2>
    let h2Tag = document.createElement('h2');
    h2Tag.textContent = roleInput.value;

    // create <small> ... </small>
    let smallTag = document.createElement('small');
    smallTag.textContent =
      fromInput.value +
      ' - ' +
      (toInput.value !== '' ? toInput.value : 'Current');
    h2Tag.appendChild(this.generateBtnBlock());
    h2Tag.appendChild(smallTag); // <h2> ... <small> ... </small> </h2>

    // create <h3> Company Name</h3>
    let h3Tag = document.createElement('h3');
    h3Tag.textContent = companyInput.value;

    // create <p> ... </p>
    let pTags = document.createElement('p');
    // create <div class="tags"> ... </div>
    let tagsBlock = document.createElement('div');
    pTags.textContent = descriptionInput.value;
    let tags = tagsInput.value.split(',');
    tagsBlock.classList.add('tags');
    for (let i = 0; i < tags.length; i++) {
      // <span class="label">tag[i]</span>
      let spanTag = document.createElement('span');
      spanTag.classList.add('label');
      if (tags[i]) {
        spanTag.textContent = tags[i];
        tagsBlock.appendChild(spanTag);
      }
    }

    // create <div class="cv__..." > ... </div>
    let divTag = document.createElement('div');
    divTag.classList.add('cv__info');
    divTag.classList.add('cv__' + blockID);
    divTag.appendChild(h2Tag);
    divTag.appendChild(h3Tag);
    divTag.appendChild(pTags);
    divTag.appendChild(tagsBlock);

    // get the element to write inside
    let to = document.getElementById('cv__' + blockID + 's') as any;
    to.appendChild(divTag);
  }
  addProject(blockID: string, $event: any) {
    blockID = 'project';
    let nameInput = document.getElementById(blockID + '_name') as any;
    let linkInput = document.getElementById(blockID + '_link') as any;
    let fromInput = document.getElementById(blockID + '_from') as any;
    let toInput = document.getElementById(blockID + '_to') as any;
    let descriptionInput = document.getElementById(
      blockID + '_description'
    ) as any;
    let tagsInput = document.getElementById(blockID + '_tags') as any;
    $event.preventDefault();
    if (
      $('#' + blockID + ' form')
        .parsley()
        .isValid()
    ) {
      // create <h2> ... </h2>
      let h2Tag = document.createElement('h2');
      h2Tag.textContent = nameInput.value;
      h2Tag.appendChild(this.generateBtnBlock());

      // create <small> ... </small>
      let smallTag = document.createElement('small');
      smallTag.textContent =
        fromInput.value +
        ' - ' +
        (toInput.value !== '' ? toInput.value : 'Current');
      h2Tag.appendChild(smallTag); // <h2> ... <small> ... </small> </h2>

      // create <h3> ... </h3>
      let h3Tag = document.createElement('h3');
      h3Tag.textContent = linkInput.value;

      // create <p> ... </p>
      let pTags = document.createElement('p');
      pTags.textContent = descriptionInput.value;

      // create <div class="tags"> ... </div>
      let tagsBlock = document.createElement('div');
      tagsBlock.classList.add('tags');
      let tags = tagsInput.value.split(',');
      for (let i = 0; i < tags.length; i++) {
        // <span class="label">tag[i]</span>
        let spanTag = document.createElement('span');
        spanTag.classList.add('label');
        if (tags[i]) {
          spanTag.textContent = tags[i];
          tagsBlock.appendChild(spanTag);
        }
      }

      // create <div class="cv__..." > ... </div>
      let divTag = document.createElement('div');
      divTag.classList.add('cv__info');
      divTag.classList.add('cv__' + blockID);
      divTag.appendChild(h2Tag);
      divTag.appendChild(h3Tag);
      divTag.appendChild(pTags);
      divTag.appendChild(tagsBlock);

      // get the element to write inside
      let to = document.getElementById('cv__' + blockID + 's');
      to?.appendChild(divTag);
    } else {
      $('#' + blockID + ' form')
        .parsley()
        .validate();
    }
  }

  addEducation(blockID: string, $event: any) {
    // get elements
    blockID = 'education';
    let degreeInput = document.getElementById(blockID + '_degree') as any;
    let schoolInput = document.getElementById(blockID + '_school') as any;
    let fromInput = document.getElementById(blockID + '_from') as any;
    let toInput = document.getElementById(blockID + '_to') as any;
    let descriptionInput = document.getElementById(
      blockID + '_description'
    ) as any;

    $event.preventDefault();
    if (
      $('#' + blockID + ' form')
        .parsley()
        .isValid()
    ) {
      // create <h2> ... </h2>
      let h2Tag = document.createElement('h2');
      h2Tag.textContent = degreeInput.value;
      h2Tag.appendChild(this.generateBtnBlock());

      // create <small> ... </small>
      let smallTag = document.createElement('small');

      smallTag.textContent =
        fromInput.value +
        ' - ' +
        (toInput.value !== '' ? toInput.value : 'Current');
      h2Tag.appendChild(smallTag); // <h2> ... <small> ... </small> </h2>

      // create <h3> ... </h3>
      let h3Tag = document.createElement('h3');
      h3Tag.textContent = schoolInput.value;

      // create <p> ... </p>
      let pTags = document.createElement('p');
      pTags.textContent = descriptionInput.value;

      // create <div class="cv__..." > ... </div>
      let divTag = document.createElement('div');
      divTag.classList.add('cv__' + blockID);
      divTag.classList.add('cv__info');
      divTag.appendChild(h2Tag);
      divTag.appendChild(h3Tag);
      divTag.appendChild(pTags);

      // get the element to write inside
      let to = document.getElementById('cv__' + blockID + 's');
      to?.appendChild(divTag);
    } else {
      $('#' + blockID + ' form')
        .parsley()
        .validate();
    }
  }

  addSkills(inputName: string, $event: any) {
    inputName = 'skill';
    let input = document.getElementById('input-' + inputName) as any;
    let select = document.getElementById(
      'select-' + inputName + '_level'
    ) as any;
    $event.preventDefault();
    let divTag = document.createElement('div');
    divTag.classList.add('cv__info');
    divTag.classList.add('info-skill');
    // create <progress class="secondary float-right" max="100" value="85"></progress>
    let progressTag = document.createElement('progress');
    progressTag.classList.add('secondary');
    progressTag.max = 100;
    progressTag.style.width = '100%';
    progressTag.value = select.value;

    // create <span> ... </span>
    let spanTag = document.createElement('span');
    spanTag.textContent = input.value;

    //create empty div
    let div1 = document.createElement('div');
    div1.appendChild(spanTag);
    div1.appendChild(this.generateBtnBlock());

    let div2 = document.createElement('div');
    div2.appendChild(progressTag);

    // get the element to write inside
    let to = document.getElementById('cv__' + inputName + 's');
    divTag.appendChild(div1);
    divTag.appendChild(div2);
    to?.appendChild(divTag);
  }

  addLanguage(inputName: string, $event: any) {
    // get elements
    inputName = 'language';
    let input = document.getElementById('input-' + inputName) as any;
    let select = document.getElementById(
      'select-' + inputName + '_level'
    ) as any;
    let button = document.getElementById('button-' + inputName + '_add') as any;

    $event.preventDefault();
    // create <small> Level </small>
    if (
      $('#input-' + inputName)
        .parsley()
        .isValid() &&
      $('#select-' + inputName + '_level')
        .parsley()
        .isValid() &&
      input.value !== ''
    ) {
      let smallTag = document.createElement('small');
      smallTag.textContent = ' ( ' + select.value + ' ) ';

      // create <div> ... </div>
      let divTag = document.createElement('div');
      divTag.classList.add('cv__info');
      divTag.textContent = input.value;

      // get the element to write inside
      let to = document.getElementById('cv__' + inputName + 's');
      divTag.appendChild(smallTag);
      divTag.appendChild(this.generateBtnBlock());
      to?.appendChild(divTag);
    }
  }

  addInterest(inputName: string, $event: any) {
    // get elements
    inputName = 'interest';
    let input = document.getElementById('input-' + inputName) as any;
    $event.preventDefault();
    if (
      $('#input-' + inputName)
        .parsley()
        .isValid() &&
      input.value !== ''
    ) {
      // create <div> ... </div>
      let divTag = document.createElement('div');
      divTag.classList.add('cv__info');

      divTag.textContent = input.value;
      divTag.appendChild(this.generateBtnBlock());

      // get the element to write inside
      let to = document.getElementById('cv__' + inputName + 's');
      to?.appendChild(divTag);
    }
  }
}
