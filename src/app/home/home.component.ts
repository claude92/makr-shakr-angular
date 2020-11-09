import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { AccountService, BookService, AlertService } from '@app/_services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  form: FormGroup;
  loading = false;
  submitted = false;
  books = null;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private bookService: BookService,
    private alert: AlertService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titolo: ['', Validators.required]
    })
    this.bookService.getAll().subscribe(books => {
      this.books = books
    })
  }
  get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.form.value);
    this.bookService.insertBook(this.form.value)
      .subscribe(() => {
        this.alert.success('Book inserted successfully!');
        this.loading = false;
        this.form.reset();
      }, () => {
        this.alert.error("Something is gone wrong!");
        this.loading = false;
        this.form.reset();
      })
    this.bookService.getAll().subscribe(books => {
      this.books = books
    })
  }
}
