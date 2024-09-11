import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share-list',
  standalone: true,
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.scss']
})
export class ShareListComponent implements OnInit {
  listUrl: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const listId = this.route.snapshot.paramMap.get('id');
    this.listUrl = `http://localhost:4200/view-list/${listId}`;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.listUrl);
    alert('Link copiado!');
  }

  shareViaWhatsApp() {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(this.listUrl)}`);
  }
}