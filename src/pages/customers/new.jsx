/* eslint-disable react/display-name */
import React, { useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from '../../components/elements/section-title/index';
import Widget from '../../components/elements/widget/index';
import FormValidation from '../../components/elements/forms/validation';

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();


export default function Schools() {
  
  const router = useRouter(); //vai buscar o router

  const onSubmit = async (data) => {
    
    const url = publicRuntimeConfig.SERVER_URI + `api/base/customers`;

    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(data),
      }
    );

    router.push("/customers")
  }

  let items = [
    {
      label: 'Code',
      name: 'code',
      type: 'text',
      placeholder: 'Enter the Code'
    },
    {
      label: 'Name',
      error: {required: 'Please enter your name'},
      name: 'name',
      type: 'text',
      placeholder: 'Enter the name'
    },
    {
      label: 'Email',
      name: 'email',
      type: 'text',
      placeholder: 'Enter the Email'
    },
    {
      label: 'Phone Number',
      name: 'phoneNumber',
      type: 'text',
      placeholder: 'Enter the Phone Number'
    },
    {
      label: 'CellPhone',
      name: 'cellphone',
      type: 'text',
      placeholder: 'Enter the CellPhone'
    },
    {
      label: 'Address',
      name: 'address',
      type: 'textarea',
      placeholder: 'Enter the Address'
    },    
    {
      label: 'Status',
      name: 'status',
      type: 'text',
      placeholder: 'Enter your Status'
    }
  ]

  return (
    <>
      <SectionTitle title="Create a New" subtitle="Customer" />

      <Widget
        title=""
        description=""
        right=""
      >
      <FormValidation items={items} onSubmit={onSubmit}/>
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
