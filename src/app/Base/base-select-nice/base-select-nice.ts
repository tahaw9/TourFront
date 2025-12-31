import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output, SimpleChanges,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-base-select-nice',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './base-select-nice.html',
  styleUrl: './base-select-nice.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseSelectNiceComponent),
      multi: true
    }
  ]
})
export class BaseSelectNiceComponent implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {

  @Input() items: any[] = [];
  @Input() bindLabel: string = 'Name'; // Default property for text
  @Input() bindValue: string = 'Guid'; // Default property for value
  @Input() placeholder: string = 'انتخاب کنید...';
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Output() change = new EventEmitter<any>();

  @ViewChild('selectRef') selectRef!: ElementRef;

  value: any = null;

  // Callbacks for ControlValueAccessor
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.initNiceSelect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger
    // If the data list changes, we need to update the plugin
    if (changes['items'] && !changes['items'].firstChange) {
      // We use detectChanges to ensure Angular renders the <option> tags
      // BEFORE we tell jQuery to update the UI
      this.cdr.detectChanges();
      this.updateNiceSelect();
    }

    // If disabled state changes
    if (changes['disabled'] && !changes['disabled'].firstChange) {
      // specific nice-select logic for disable could go here if supported,
      // otherwise it usually inherits from the select
      this.updateNiceSelect();
    }
  }

  private initNiceSelect() {
    const $select = $(this.selectRef.nativeElement);

    // Initialize the plugin
    $select.niceSelect();

    // Listen for changes from the jQuery plugin
    $select.on('change', (event: any) => {
      const val = $(event.target).val();

      // Update Angular Model
      this.value = val;
      this.onChange(val);
      this.onTouched();

      // Emit generic change event
      this.change.emit(val);
    });
  }

  private updateNiceSelect() {
    if (this.selectRef) {
      $(this.selectRef.nativeElement).niceSelect('update');
    }
  }

  ngOnDestroy(): void {
    if (this.selectRef) {
      const $select = $(this.selectRef.nativeElement);
      $select.off('change');
      $select.niceSelect('destroy');
    }
  }

  // --- ControlValueAccessor Implementation ---

  writeValue(value: any): void {
    this.value = value || "";
    // When value comes from the parent (ngModel), we need to update the UI
    setTimeout(() => {
      this.updateNiceSelect();
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.updateNiceSelect();
  }
}
