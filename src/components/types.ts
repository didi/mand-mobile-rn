export type IMDOptionValue = boolean | string | number;

export interface IMDOptionSet {
  value: boolean | string | number;
  label: string;
  checked?: boolean;
  disabled?: boolean;
}
