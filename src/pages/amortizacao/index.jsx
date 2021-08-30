/* eslint-disable react/display-name */
import React, { useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from '../../components/elements/section-title/index';
import Widget from '../../components/elements/widget/index';
import FormValidation from '../../components/elements/forms/validation';
import FormOrder from '../../components/elements/forms/validation';

import Modal from "../../components/partials/modals/create-modal";
import Datatable from "../../components/elements/datatable/ActionsTable";
import { UnderlinedTabs } from "../../components/elements/tabs";

import { FiSave, FiClipboard } from 'react-icons/fi';

import typedocService from "../../services/typedoc";
import customerService from "../../services/customers";
import productService from "../../services/products";
import projectService from "../../services/projects";
import * as Math from "../../functions/numbers";
import Dates from "../../functions/datetime";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Documents({ }) {

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


  const itemsTotal = [
    { title: 'Reference Dat', element: <text>31-08-2021</text> },
    { title: 'Taxa de juro (ao ano)', element: <text>0%</text> },
    { title: 'Taxa de juro (ao mes)', element: <text>0%</text> },
    { title: 'Prest. Juros e Capitais', element: <text>2000</text> },
  ]

  const itemsResume = [
    { title: 'Perido da Tabela', element: <text>Mensal</text> },
    { title: 'Nr. de Meses no Ano', element: <text>12</text> },
    { title: 'Valor do Financimanento', element: <text>0</text> },
    { title: 'Nr. Prestação de Juros e Capital(em anos)', element: <text>0</text> },
    { title: 'Nr. Prestação de Juros e Capital(em meses)', element: <text>0</text> },
    { title: 'Nr. Prestação de Diferimento', element: <text>0</text> },
  ]

  let itemsLines = [
    {
      label: 'Data de Pagamento',
      name: 'date',
      type: 'date'
    },
    {
      label: 'Nr. de Prestações',
      name: 'prestacoes',
      type: 'text'
    },

    {
      label: 'Capital',
      name: 'capital',
      type: 'number'
    },
    {
      label: 'Juros',
      name: 'juros',
      type: 'number'
    },
    {
      label: 'Amortização',
      name: 'amortizacao',
      type: 'number'
    },
    {
      label: 'Prestacao',
      name: 'prestacao',
      type: 'number'
    },
    {
      label: 'Saldo',
      name: 'saldo',
      type: 'number'
    }
  ]

  const ResumeDiv = () => {
    return (<>
      <div className="table table-auto w-full">
        <div className="table-row-group">
          {itemsResume.map((item, i) => (
            <div className="table-row" key={i}>
              <div className="table-cell whitespace-nowrap px-2 text-sm">
                {item.title}
              </div>
              <div className="table-cell px-2 whitespace-normal">
                {item.element}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
    );
  }

  const TotalDiv = () => {
    return (<>
      <div className="table table-auto w-full">
        <div className="table-row-group">
          {itemsTotal.map((item, i) => (
            <div className="table-row" key={i}>
              <div className="table-cell whitespace-nowrap px-2 text-sm">
                {item.title}
              </div>
              <div className="table-cell px-2 whitespace-normal">
                {item.element}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
    );
  }

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


  const onSubmitAddLines = async (data) => {

    const list = [...items]

    list.push({ id: 0, grossTotal: data.total, ...data })

    setVatTotal(list.reduce((acc, line) => acc + Number(line.vatTotal), 0))
    setGrossTotal(list.reduce((acc, line) => acc + Number(line.price * line.quantity), 0))
    setTotal(list.reduce((acc, line) => acc + Number(line.total), 0) - Number(discountTotal))

    setItems(list);
  }


  const LineItems = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Id",
          accessor: "id"
        },
        {
          Header: "Data de Pagamento",
          accessor: "date"
        },
        {
          Header: 'Nr. de Prestações',
          accessor: 'prestacoes'
        },
        {
          Header: "Capital",
          accessor: "capital"
        },
        {
          Header: "Juros",
          accessor: "juros"
        },
        {
          Header: "Amortização",
          accessor: "amortizacao"
        },
        {
          Header: "Prestação",
          accessor: "prestacao"
        }
      ],
      []
    );

    return (<Datatable columns={columns} data={items} link="/product"
      canView={false} canEdit={false} />);
  };


  return (
    <>
      <SectionTitle title="Plano de Amortização" subtitle="" />

      <Widget
        title=""
        description=""
        right={

          <div>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button"
              onClick={handleSave}>

              <FiSave className="stroke-current text-white" size={18} />
              <span>Save</span>
            </button>

            <Modal
              title="Add new Item."
              icon={
                <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <FiClipboard size={18} className="stroke-current text-red-500" />
                </span>
              }
              body={<FormValidation items={itemsLines} onSubmit={onSubmitAddLines} />}
              buttonTitle="Save"
              buttonClassName="btn btn-default btn-rounded bg-green-500 hover:bg-red-600 text-white"

            />

          </div>
        }
      >
        <fieldset>
          <legend>Dados Gerais</legend>

          <div class="grid grid-cols-2 gap-4">
            <div><ResumeDiv /> </div>
            <div><TotalDiv /></div>
          </div>
        </fieldset>

        <LineItems />
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
