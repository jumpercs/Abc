import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestUpdate } from '../user.model';
import { User } from '../user.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id: string;
  request: RequestUpdate;


  // tslint:disable-next-line: variable-name
  constructor(private userService: UserService, private route: ActivatedRoute, private _route: Router) { }



  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.id).subscribe(res => {
      this.request = {
        name: `${res.data.first_name} ${res.data.last_name}`,
        job: ''
      };
    });
  }

  update() {
    this.userService.updateUser(this.id, this.request).subscribe(res => {
      alert(`Atualizado ${res.updatedAt}, Nome: ${res.name}, job: ${res.job}`);
    });
    this.cancel();
  }
  cancel() {
    this._route.navigate(['/users']);
  }
}
