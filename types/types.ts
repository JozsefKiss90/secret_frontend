
export type PostSecret = {
    secret_text?: string;
    expireAfterViews?: number;
    expireAfter?: number;
  } | undefined;

export type SecretFormPropsCreate = {
    secret: PostSecret,
    warning: boolean,
    feedback: string,
    isLoading: boolean,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
};

export type SecretFormPropsRetrieve = {
  hash: string
  warningMessage: string 
  isXmlResponse: boolean
  isLoading:boolean
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleToggleChange: () => void
  handleSubmit: (e: React.FormEvent) => void
}

export type GetSecret = {
    secret_text?: string
    remaining_views?: number
    expires_at?: string
  } | undefined 

export type SecretTableProps = {
    secret: GetSecret;
};