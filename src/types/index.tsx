export interface EstablishmentData {
  cnpj: string;
  name: string;
  category: string;
  email: string;
  phone: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
}

interface CreateEstablishmentRouteParams {
  initialData?: EstablishmentData;
}
