/* eslint-disable @typescript-eslint/ban-ts-comment */
import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';
import Menu from '../../components/menu';
import {
  MENU_FRAGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from '../../fragments';
import useMe from '../../hooks/useMe';
import {
  createPayment,
  createPaymentVariables,
} from '../../__api__/createPayment';
import {
  myRestaurant,
  myRestaurantVariables,
} from '../../__api__/myRestaurant';

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestuarantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...MenuParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${MENU_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

const CREATE_PAYMENT_MUTATION = gql`
  mutation createPayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ok
      error
    }
  }
`;

function MyRestaurant() {
  const params = useParams<{ id: string }>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: Number(params.id),
        },
      },
    },
  );

  const onCompleted = (data: createPayment) => {
    if (data.createPayment.ok) {
      alert('Your restaurant is being promoted!');
    }
  };
  const [createPaymentMutation] = useMutation<
    createPayment,
    createPaymentVariables
  >(CREATE_PAYMENT_MUTATION, {
    onCompleted,
  });

  const { data: userData } = useMe();
  const triggerPaddle = () => {
    if (userData?.me.email) {
      createPaymentMutation({
        variables: {
          input: {
            transactionId: 'temp-id',
            restaurantId: Number(params.id),
          },
        },
      });
      // // @ts-ignore
      // window.Paddle.Setup({ vendor: 666 });
      // // @ts-ignore
      // window.Paddle.Checkout.open({
      //   product: 666,
      //   email: userData.me.email,
      //   successCallback: (data: any) => {
      //     createPaymentMutation({
      //       variables: {
      //         input: {
      //           transactionId: data.checkout.id,
      //           restaurantId: Number(params.id),
      //         },
      //       },
      //     });
      //   },
      // });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {data?.myRestaurant.restaurant.name || ''} | Uber eats clone
        </title>
      </Helmet>
      <div
        className="bg-gray-700 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      />
      <div className="lg:px-16 mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || 'Loading...'}
        </h2>
        <Link
          to={`/restaurants/${params.id}/add-menu`}
          className="mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Menu &rarr;
        </Link>
        <button
          type="button"
          onClick={triggerPaddle}
          className=" cursor-pointer text-white bg-lime-700 py-3 px-10"
        >
          Buy Promotion &rarr;
        </button>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <span className="text-lime-600 mt-10 block">
              Please create dish!
            </span>
          ) : (
            <div className="mt-10 grid md:grid-cols-3 gap-x-8 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map((menu) => (
                <Menu
                  key={menu.id}
                  name={menu.name}
                  description={menu.description}
                  price={menu.price}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-center text-2xl font-medium">Sales</h4>
          <div className="mt-10">
            <VictoryChart
              height={500}
              theme={VictoryTheme.material}
              width={window.innerWidth}
              domainPadding={50}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                labels={({ datum }) => `${datum}`}
                labelComponent={
                  <VictoryTooltip
                    style={{ fontSize: 18 } as any}
                    renderInPortal
                    dy={-20}
                  />
                }
                data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                  x: order.createdAt,
                  y: order.total,
                }))}
                interpolation="natural"
                style={{
                  data: {
                    strokeWidth: 5,
                  },
                }}
              />
              <VictoryAxis
                tickLabelComponent={<VictoryLabel renderInPortal />}
                style={{
                  tickLabels: {
                    fontSize: 20,
                  } as any,
                }}
                tickFormat={(tick) => new Date(tick).toLocaleDateString('ko')}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRestaurant;
