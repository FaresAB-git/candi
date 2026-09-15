import { Component, input, output } from '@angular/core';

export type ButtonVariant = 'primary' | 'neutral' | 'accent';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  variant = input<ButtonVariant>('neutral');
  type = input<'button' | 'submit'>('button');
  disabled = input<boolean>(false);

  clicked = output<void>();

  handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
