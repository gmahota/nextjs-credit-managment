/* eslint-disable react/display-name */
import React, { useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from '../../components/elements/section-title/index';
import Widget from '../../components/elements/widget/index';
import FormValidation from './../../components/elements/forms/validation';
import Repository, { baseUrl, serializeQuery } from "../../services/Repository";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();


export default function Schools() {

  const router = useRouter(); //vai buscar o router

  const onSubmit = async (data) => {

    await Repository.post(`${baseUrl}/products`, data)
      .then(
        router.push("/products")
      ).catch(function (error) {
        console.log(error);
        alert("Ocorreu um erro durante a gravação")
      });
  }

  let items = [
    {
      label: 'Code',
      error: { required: 'Please enter your code' },
      name: 'code',
      type: 'text',
      placeholder: 'Enter the code'
    },
    {
      label: 'Description',
      error: { required: 'Please enter your description' },
      name: 'description',
      type: 'text',
      placeholder: 'Enter the description'
    }
  ]

  return (
    <>
      <SectionTitle title="Adicione o Novo" subtitle="Tipo de Crétido" />

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
