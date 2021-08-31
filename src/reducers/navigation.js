import React from "react";
import {
  FiSettings,
  FiShoppingBag,
  FiToggleLeft,
  FiList,
  FiActivity,
  FiCalendar,
  FiStar,
  FiDroplet,
  FiGrid,
  FiClock,
  FiCopy,
  FiUser,
  FiPieChart,
  FiCompass
} from "react-icons/fi";

const initialState = [
  {
    title: "Sistema de Crédito",
    items: [
      {
        url: "/",
        icon: <FiCompass size={20} />,
        title: "Dashboard",
        items: [],
      },
      {
        url: "/",
        icon: <FiActivity size={20} />,
        title: "Reports",
        items: [
          {
            url: "/",
            title: "General",
            items: [],
          },
          {
            url: "/",
            title: "History",
            items: [],
          },
          {
            url: "/",
            title: "Pedding",
            items: [],
          },
          {
            url: "/",
            title: "Statement",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <FiShoppingBag size={20} />,
        title: "Crédito",
        items: [
          {
            url: "/amortizacao",
            title: "Plano de Amortização",
            items: [],
          },
          {
            url: "/credit/simulator",
            title: "Simulador de Crédito",
            items: [],
          },
          {
            url: "/credit/simulator",
            title: "Pedido de Crédito",
            items: [],
          },
          {
            url: "/credit/simulator",
            title: "Validação Crédito",
            items: [],
          },
          {
            url: "/credit/simulator",
            title: "Avaliação de Muturios",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <FiSettings size={20} />,
        title: "Definições",
        badge: {
          color: "bg-indigo-500 text-white",
          text: 6,
        },
        items: [
          {
            url: "/customers",
            title: "Cadastro de Mutuario",
            items: [],
          },
          {
            url: "/products",
            title: "Tipo de Crédito",
            items: [],
          },
        ],
      },
    ],
  },
];

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
