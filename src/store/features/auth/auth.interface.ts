export type AuthType = {
  type: string;
};
export type RegisterType = {
  message: string;
  access: string;
  refresh: string;
  user: {
    pk: string;
    email: string;
    full_name: string;
    signup_date: string;
    is_subscription: boolean;
    is_trial: boolean;
    has_active_subscription: boolean;
    subscription_type: null;
  };
  claim_uploads: never[];
  error: null;
};

export type RegisterFileds = {
  email: string;
  password: string;
  full_name: string;
  address: string;
  phone_number: string;
};
