import * as yup from "yup"

const date = new Date().getFullYear() + 2

export const vehicleSchema = yup.object({
    placa: yup.string()
      .required('Por favor, informe a placa do veículo.')
      .matches(/^[A-Za-z]{3}\d{4}$/, 'Por favor, informe uma placa válida no formato AAA1234.'),
    anoDeFabricação: yup.number()
      .required('Por favor, informe o ano de fabricação do veículo.')
      .typeError('Por favor, informe o ano de fabricação do veículo.')
      .test('valida-ano', `O ano de fabricação não pode ser maior que o ano seguinte e deve ser maior que 1900 e menor que ${date}.`, function (value) {
        const thisYear = new Date().getFullYear() + 1;
        return value <= thisYear && value >= 1900;
      }),
    modelo: yup.string().required('Por favor, informe o modelo do veículo.'),
    quilometragemAtual: yup.number()
      .required('Por favor, informe a quilometragem atual do veículo.')
      .typeError('Por favor, informe a quilometragem atual do veículo.')
      .min(0, 'A quilometragem atual não pode ser menor que 0.')
  });