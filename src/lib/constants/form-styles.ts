// Reusable form styles
export const FORM_STYLES = {
  input: 'border-border focus:border-sitora-primary focus:ring-sitora-primary/20 h-10 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0',
  label: 'text-sitora-text-subtitle text-sm font-medium',
  dialog: 'bg-sitora-white border-border mx-auto my-4 max-h-[90vh] w-[96%] overflow-y-auto rounded-[16px!important] border p-8 shadow-sm sm:max-w-lg',
  dialogTitle: 'text-sitora-text-subtitle text-2xl font-semibold',
  dialogDescription: 'text-sitora-body text-sm leading-tight font-normal',
  select: 'border-border focus:border-sitora-primary h-10 w-full rounded-md shadow-none',
  cancelButton: 'border-sitora-primary text-sitora-primary hover:bg-sitora-primary hover:text-sitora-white rounded-lg',
  submitButton: 'bg-sitora-primary text-sitora-white hover:bg-sitora-primary-dark rounded-lg py-2.5',
  calendar: {
    trigger: 'border-border focus:border-sitora-primary h-10 w-full justify-start text-left font-normal shadow-none',
    dayButton: 'text-sitora-primary hover:bg-sitora-primary-light hover:text-sitora-primary rounded-lg transition-all',
    selected: 'bg-sitora-primary text-white hover:bg-sitora-primary hover:text-white rounded-lg',
  },
} as const
