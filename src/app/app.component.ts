import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from './enum/category';
import { Registry } from './interface/registry';
import { Resume } from './interface/resume';
import { FinanceService } from './service/finance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public revenueResume!: Resume;
  public expenditureResume!: Resume;
  public editRegistry!: Registry;
  public deleteRegistry!: Registry;
  public type!: string;
  public categories!: (string | Category)[]

  constructor(private financeService: FinanceService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getRevenues(new Date());
    this.getExpenditures(new Date());
  }
  
  public getRevenues(date: Date): void {
    this.financeService.getRegistries('revenue', date.getFullYear(), date.getMonth() + 1).subscribe({
      next: (response: Resume) => this.revenueResume = response,
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  public getExpenditures(date: Date): void {
    this.financeService.getRegistries('expenditure', date.getFullYear(), date.getMonth() + 1).subscribe({
      next: (response: Resume) => this.expenditureResume = response,
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  public getRegistries(date: Date): void {
    this.getRevenues(date);
    this.getExpenditures(date);
  }

  public onAddRegistry(addForm: NgForm): void {
    this.financeService.addRegistry(this.type, addForm.value).subscribe({
      next: () => this.getRegistries(new Date()),
      error: (error: HttpErrorResponse) => alert(error.message)
    });
    addForm.reset();
  }

  public onUpdateRegistry(registry: Registry): void {
    this.financeService.updateRegistry(this.type, registry).subscribe({
      next: () => this.getRegistries(new Date()),
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  public onDeleteRegistry(registryId: number): void {
    this.financeService.deleteRegistry(this.type, registryId).subscribe({
      next: () => this.getRegistries(new Date()),
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  public setTextInAddRegistry() {
    const modalTitle = document.getElementById('addRegistryModalLabel');
    const inputCategory = document.getElementById('category-input');

    if (this.type === 'revenue') {
      modalTitle!.innerHTML = "Adicionar Receita";
      inputCategory!.hidden = true;
    } 

    if (this.type === 'expenditure') {
      modalTitle!.innerText = "Adicionar Despesa";
    }
  }

  public setTextInDeleteRegistry() {
    const modalTitle = document.getElementById('deleteRegistryModelLabel');

    if (this.type === 'revenue') {
      modalTitle!.innerHTML = "Excluir Receita";
    } 

    if (this.type === 'expenditure') {
      modalTitle!.innerText = "Excluir Despesa";
    }
  }

  public setTextInUpdateRegistry() {
    const modalTitle = document.getElementById('updateRegistryModalLabel');
    const inputCategory = document.getElementById('category-input');

    if (this.type === 'revenue') {
      modalTitle!.innerHTML = "Atualizar Receita";
      inputCategory!.hidden = true;
    } 

    if (this.type === 'expenditure') {
      modalTitle!.innerText = "Atualizar Despesa";
    }
  }
  
  public onOpenModal(type: string, registry: Registry, mode: string): void {

    this.type = type;
    this.categories = Object.values(Category).filter(value => typeof value === 'string');
    const container = document.getElementById('table-body')

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    
    if (mode === 'add') {
      this.setTextInAddRegistry();

      button.setAttribute('data-bs-target', '#addRegistryModal');
    }
    if (mode === 'edit') {
      this.setTextInUpdateRegistry();
      this.editRegistry = registry;
      button.setAttribute('data-bs-target', '#updateRegistryModal');
    }
    if (mode === 'delete') {
      this.setTextInDeleteRegistry();
      this.deleteRegistry = registry;
      button.setAttribute('data-bs-target', '#deleteRegistryModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
