export type ContributionFormProps = {
  onClose: () => void;
  onRefetch: () => void;
  contribution?: any;
};

export type ContributionAddEditForm = {
  contribution: any;
  products: any[];
  zones: any[];
  countries: any[];
  tarifs: any[];
  addContribution: (data: any) => Promise<void>;
  updateContribution: (
    id: string,
    data: any,
    changeActive?: undefined,
  ) => Promise<void>;
  onClose: () => void;
  onRefetch: () => void;
  setMessageSnackbar: (message: any) => void;
  countryId?: string;
  zoneId?: string;
  rows?: any;
  setRows?: any;
  filteredZones?: any;
  setFilteredZones?: any;
};

export type Contribution = {
  name: string;
  email: string;
  phone: string;
  countryId: string;
  zoneId: string;
  totalCost: number;
  totalPrice: number;
  shippingCost: number;
  totalFinal: number;
};

export type ContributionInitialValues = {
  name?: string;
  email?: string;
  phone?: string;
  countryId?: string;
  zoneId?: string;
  totalCost?: number;
  totalPrice?: number;
  shippingCost?: number;
  totalFinal?: number;
};
