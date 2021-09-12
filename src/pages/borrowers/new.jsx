/* eslint-disable react/display-name */
import React, { useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from '../../components/elements/section-title/index';
import Widget from '../../components/elements/widget/index';
import FormValidation from '../../components/elements/forms/validation';

import Repository, { baseUrl, serializeQuery } from "../../services/Repository";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();


export default function Borrowers() {

  const router = useRouter(); //vai buscar o router

  const onSubmit = async (data) => {
    data.status = 'candidate';
    await Repository.post(`${baseUrl}/customers`, data)
      .then(
        router.push("/borrowers")
      ).catch(function (error) {
        console.log(error);
        alert("Ocorreu um erro durante a gravação")
      });

  }

  let items = [
    {
      label: 'Code',
      name: 'code',
      type: 'text',
      placeholder: 'Enter the code'
    },
    {
      label: 'Name',
      error: { required: 'Please enter your name' },
      name: 'name',
      type: 'text',
      placeholder: 'Enter the description'
    },
    {
      label: 'Address',
      error: { required: 'Please enter the address' },
      name: 'address',
      type: 'text',
      placeholder: 'Enter the address'
    },
    {
      label: 'PhoneNumber',
      error: { required: 'Please enter the PhoneNumber' },
      name: 'phonemumber',
      type: 'text',
      placeholder: 'Enter the PhoneNumber'
    },
    {
      label: 'Cellphone',
      name: 'cellphone',
      type: 'text',
      placeholder: 'Enter the Cellphone'
    },
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      placeholder: 'Enter the Status'
    },
    {
      label: 'Country',
      name: 'country',
      type: 'text',
      placeholder: 'Enter the Country'
    },
    {
      label: 'Province',
      name: 'province',
      type: 'text',
      placeholder: 'Enter the Province'
    },
    {
      label: 'Debit Capacity',
      error: { required: 'Please enter the Debit Capacity' },
      name: 'debtCapacity',
      type: 'number',
      placeholder: 'Enter the Debit Capacity'
    }
  ]

  return (
    <>
      <SectionTitle title="Dados do Novo" subtitle="Mutuario" />

      <Widget
        title=""
        description=""
        right=""
      >
        <FormValidation items={items} onSubmit={onSubmit} />
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
  //await apiClient.get('/users')



  return {
    props: {

    },
  };
};
