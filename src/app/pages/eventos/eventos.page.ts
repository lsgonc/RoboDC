import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  public events = [
    {
      title: 'Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget ultricies arcu, sit amet tristique ipsum. Donec a ornare turpis. In mollis sit amet felis a pulvinar. Duis vel lectus id nisl volutpat iaculis vel eget nibh. Mauris cursus placerat nisl nec tristique...',
      datetime: '07 de Setembro  - 10h',
      local: 'Auditório do DC',
    },
    {
      title: 'Title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      datetime: '07 de Setembro  - 10h',
      local: 'Auditório do DC',
    },
    {
      title: 'Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget ultricies arcu, sit amet tristique ipsum. Donec a ornare turpis. In mollis sit amet felis a pulvinar. Duis vel lectus id nisl volutpat iaculis vel eget nibh. Mauris cursus placerat nisl nec tristique...',
      datetime: '07 de Setembro  - 10h',
      local: 'Auditório do DC',
    },
    {
      title: 'Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget ultricies arcu, sit amet tristique ipsum. Donec a ornare turpis. In mollis sit amet felis a pulvinar. Duis vel lectus id nisl volutpat iaculis vel eget nibh. Mauris cursus placerat nisl nec tristique...',
      datetime: '07 de Setembro  - 10h',
      local: 'Auditório do DC',
    },
    {
      title: 'Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget ultricies arcu, sit amet tristique ipsum. Donec a ornare turpis. In mollis sit amet felis a pulvinar. Duis vel lectus id nisl volutpat iaculis vel eget nibh. Mauris cursus placerat nisl nec tristique...',
      datetime: '07 de Setembro  - 10h',
      local: 'Auditório do DC',
    },
    {
      title: 'Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget ultricies arcu, sit amet tristique ipsum. Donec a ornare turpis. In mollis sit amet felis a pulvinar. Duis vel lectus id nisl volutpat iaculis vel eget nibh. Mauris cursus placerat nisl nec tristique...',
      datetime: '07 de Setembro  - 10h',
      local: 'Auditório do DC',
    },
    {
      title: 'Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget ultricies arcu, sit amet tristique ipsum. Donec a ornare turpis. In mollis sit amet felis a pulvinar. Duis vel lectus id nisl volutpat iaculis vel eget nibh. Mauris cursus placerat nisl nec tristique...',
      datetime: '07 de Setembro  - 10h',
      local: 'Auditório do DC',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
