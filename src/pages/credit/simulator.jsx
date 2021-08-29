/* eslint-disable react/display-name */
import React, { useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from '../../components/elements/section-title/index';
import Widget from '../../components/elements/widget/index';
import FormValidation from './../../components/elements/forms/validation';
import FormOrder from './../../components/elements/forms/validation';

import Modal from "../../components/partials/modals/create-modal";
import Datatable from "../../components/elements/datatable/ActionsTable";
import { UnderlinedTabs } from "../../components/elements/tabs";

import { FiPrinter, FiClipboard } from 'react-icons/fi';

import * as Math from "../../functions/numbers";
import Dates from "../../functions/datetime";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Documents({

}) {

  const router = useRouter(); //vai buscar o router

  const [items, setItems] = useState([])
  const [vatTotal, setVatTotal] = useState(0)
  const [grossTotal, setGrossTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [discountTotal, setDiscountTotal] = useState(0)

  const [code, setCode] = useState("")
  const [date, setDate] = useState(new Date())
  const [type, setType] = useState("COT")
  const [serie, setSerie] = useState("")
  const [customer, setCustomer] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState("open")


  const onSubmit = async (data) => {

    setCode(data.code)

    setDate(data.date)

    setType(data.type)

    setSerie(data.serie)

    setCustomer(data.customer)

    setName(data.name)

    setDiscountTotal(data.totalDiscount)
  }

  const handleSave = async () => {

    const url = publicRuntimeConfig.SERVER_URI + `api/sales/documents`;

    let data = {
      code,
      date,
      type,
      customer,
      name,
      serie,
      discountTotal,
      grossTotal,
      vatTotal,
      total,
      status,
      items
    }

    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    router.push("/orders")
  }

  const handlerCode = async (e, setValue) => {
    const code = e.target.value;

    setCode(code)
  }

  const handlerDate = async (e, setValue) => {
    const code = e.target.value;

    setDate(code)
  }

  const handlerType = async (e, setValue) => {
    const code = e.target.value;

    setType(code)
  }

  const handlerSerie = async (e, setValue) => {
    const code = e.target.value;

    setSerie(code)
  }

  const handlerName = async (e, setValue) => {
    const code = e.target.value;

    setName(code)
  }

  const handlerDiscount = async (e, setValue) => {
    const code = e.target.value;

    setDiscountTotal(code)
  }

  const handlerStatus = async (e, setValue) => {
    const code = e.target.value;

    setStatus(code)
  }

  let itemsForm = [
    {
      label: 'Tipo de Crédito',
      name: 'type',
      type: 'select',
      placeholder: 'Tipo de Crédito',
      options: [
        { value: 'consumo', label: 'Consumo' },
        { value: 'trabalho', label: 'Trabalho' }
      ]
    },
    {
      label: 'Valor do Financimanento MZM',
      name: 'total',
      type: 'number',
      placeholder: 'Valor do Financimanento MZM'
    },
    {
      label: 'Tempo de reembolso (em meses)',
      name: 'totalMonths',
      type: 'number',
      placeholder: 'Tempo de reembolso (em meses)'
    },
    {
      label: 'Salario Mensal',
      name: 'salary',
      type: 'number',
      placeholder: 'Salario Mensal'
    },
    {
      label: 'Taxa de Desconto do Rendimento %',
      name: 'totalDiscountSalary',
      type: 'number',
      placeholder: 'Taxa de Desconto do Rendimento'
    },
    {
      label: 'Capacidade de Endividamento',
      name: 'debtCapacity',
      type: 'number',
      placeholder: 'Capacidade de Endividamento'
    },

    {
      label: 'Habilidade ao Credito',
      name: 'creditAbility',
      type: 'select',
      options: [
        { value: 'habilitado', label: 'Esta habilitado' }
      ]
    },
    {
      label: 'Prestação Mensal',
      name: 'monthlyInstallment',
      type: 'number',
      placeholder: 'Prestação Mensal'
    },
    {
      label: 'Numero de Prestações',
      name: 'numberOfInstallments',
      type: 'number',
      placeholder: 'Numero de Prestações'
    },
    {
      label: 'Reforço Mensal Necessario',
      name: 'monthlyReinforcementRequired',
      type: 'number',
      placeholder: 'Reforço Mensal Necessario'
    }
  ]



  return (
    <>
      <SectionTitle title="Simulador Crédito" subtitle="" />

      <Widget
        title=""
        description=""
        right={
          <div>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button"
              onClick={handleSave}>

              <FiPrinter className="stroke-current text-white" size={18} />
              <span>Imprimir</span>
            </button>
          </div>
        }
      >
        <FormOrder items={itemsForm} onSubmit={onSubmit} />
      </Widget>


    </>)
}

export const getServerSideProps = async (ctx) => {
  const { "attendance.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }


  return {
    props: {
    },
  };
};
