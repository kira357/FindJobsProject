export interface TableColumn<T> {
  label: string;
  property: keyof T | string;
  type:
    | 'text'
    | 'image'
    | 'badge'
    | 'progress'
    | 'checkbox'
    | 'button'
    | 'index'
    | 'yn'
    | 'checkboxCol'
    | 'buttonYn'
    | 'button';
  visible?: boolean;
  cssClasses?: string[];
  buttons?: string[];
}
