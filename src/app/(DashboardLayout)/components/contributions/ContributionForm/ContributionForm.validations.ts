import * as Yup from 'yup';
import {
  Contribution,
  ContributionInitialValues,
} from './ContributionForm.types';

export function getInitialValuesContribution(data: ContributionInitialValues) {
  return {
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
    countryId: data?.countryId || '',
    zoneId: data?.zoneId || '',
    totalCost: data?.totalCost || undefined,
    totalPrice: data?.totalPrice || undefined,
    shippingCost: data?.shippingCost || undefined,
    totalFinal: data?.totalFinal || undefined,
  };
}

export function getAddSchemaContribution() {
  return {
    name: Yup.string()
      .trim(
        'El nombre de la categoría no debe incluir espacios en blanco por demás',
      )
      .min(1, 'El nombre de la categoría debe contener como mínimo 1 caracter')
      .max(
        254,
        'El nombre de la categoría debe contener como máximo 254 caracteres',
      )
      .required('El nombre de la categoría es obligatorio'),
    email: Yup.string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es obligatorio'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'El teléfono solo puede contener números')
      .min(10, 'El teléfono debe contener al menos 10 dígitos')
      .max(15, 'El teléfono debe contener como máximo 15 dígitos')
      .required('El teléfono es obligatorio'),
    countryId: Yup.string().required('El país es obligatorio'),
    zoneId: Yup.string().required('La zona es obligatoria'),
    totalCost: Yup.number()
      .min(0, 'El costo total no puede ser negativo')
      .required('El costo total es obligatorio'),
    totalPrice: Yup.number()
      .min(0, 'El precio total no puede ser negativo')
      .required('El precio total es obligatorio'),
    shippingCost: Yup.number()
      .min(0, 'El costo de envío no puede ser negativo')
      .required('El costo de envío es obligatorio'),
    totalFinal: Yup.number()
      .min(0, 'El total final no puede ser negativo')
      .required('El total final es obligatorio'),
  };
}

export function getUpdateSchemaContribution(contribution: Contribution) {
  return { ...getAddSchemaContribution() };
}
