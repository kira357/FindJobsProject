import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
declare var $: any;

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  profileImage: File;
  imagePath: string;
  constructor() { }

  ngOnInit() {

  }

  print() {
    console.log('Goto print');
    // change the default width of the paper
    document.getElementById('paper').setAttribute("style", "width:1000px");

    const filename = 'Donwload_Resume.pdf';
    const a4Width = 210.0015555555555;  // paper Standard Width
    const a4Height = 297.0000833333333; // paper Standard Height
    const divWidth = document.getElementById('paper').offsetWidth;

    // get paper color side
    const paperSide = document.getElementById('paper-side');

    // calculate the color side  height
    const paperSideHeight = (a4Height / a4Width) * divWidth;

    // change the default height of the paper 
    paperSide.setAttribute("style", "min-height:" + paperSideHeight + "px");

    const paper = document.getElementById('paper');
    const divHeight = paper.offsetHeight;

    html2canvas(paper, {
      height: divHeight,
      width: divWidth,
      scale: 5,
      allowTaint: true,
      useCORS: true,
      logging: false
    }).then(canvas => {
      let pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (divHeight / divWidth) * width; // ratio
      pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', -2, 0, width, height);

      // pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', -2, 0, 211, pdf.internal.pageSize.getHeight());
      pdf.save(filename);

      // restore the default height and width
      paperSide.removeAttribute("style");
      document.getElementById('paper').removeAttribute("style");
    });
  }
  onFileChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) this.imagePath = "";
    this.createImage(files[0]);
  }
  createImage(file) {
    // let reader = new FileReader();
    // reader.onload = (e) => this.imagePath = e.target.result;
    // reader.readAsDataURL(file);
  }
}
