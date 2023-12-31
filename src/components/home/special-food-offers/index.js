/* eslint-disable react-hooks/exhaustive-deps */
import { alpha, Button, Card, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import useGetDiscountedItems from "../../../api-manage/hooks/react-query/product-details/useGetDiscountedItems";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
  SliderCustom,
} from "../../../styled-components/CustomStyles.style";
import H2 from "../../typographies/H2";
import { HomeComponentsWrapper } from "../HomePageComponents";

import { Stack } from "@mui/system";
import Link from "next/link";
import { getModuleId } from "../../../helper-functions/getModuleId";
import ProductCard from "../../cards/ProductCard";
import { NextFood, PrevFood } from "../best-reviewed-items/SliderSettings";
import { getLanguage } from "../../../helper-functions/getLanguage";
import { RTL } from "../../rtl";

const SpecialOfferCardShimmer = () => {
  return (
    <Stack
      p="10px"
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: "6px",
        backgroundColor: (theme) => theme.palette.background.default,
        width: "210px",
      }}
      spacing={1}
    >
      <Card sx={{ height: "180px", width: "100%" }}>
        <Skeleton variant="ractangle" height="100%" width="100%" />
      </Card>
      <CustomStackFullWidth alignItems="flex-start" justifyContent="flex-start">
        <Skeleton variant="text" width="100px" />
      </CustomStackFullWidth>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Skeleton variant="text" width="80px" />
        <Skeleton variant="text" width="40px" />
      </CustomStackFullWidth>
    </Stack>
  );
};

const SpecialFoodOffers = ({ title }) => {
  const { t } = useTranslation();
  const params = {
    offset: 1,
    limit: 15,
  };
  const { data, refetch, isLoading } = useGetDiscountedItems(params);
  const [isHover, setIsHover] = useState(false);
  const lanDirection = getLanguage() ? getLanguage() : "ltr";
  useEffect(() => {
    refetch();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: isLoading ? 1 : 5,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    variableHeight: true,
    prevArrow: isHover && <PrevFood displayNoneOnMobile />,
    nextArrow: isHover && <NextFood displayNoneOnMobile />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 821,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360, // Add a new breakpoint for smaller devices
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
        },
      },
    ],
  };

  return (
    <HomeComponentsWrapper
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      sx={{ cursor: "pointer" }}
    >
      <CustomStackFullWidth
        alignItems="center"
        justyfyContent="center"
        mb="10px"
        spacing={1}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <CustomStackFullWidth
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          {isLoading ? (
            <Skeleton variant="text" width="110px" />
          ) : (
            <H2 text={title ? title : t("Special Offer")} />
          )}
          {isLoading ? (
            <Skeleton width="100px" variant="80px" />
          ) : (
            <Link
              href={{
                pathname: "/home",
                query: {
                  search: "special-offer",
                  module_id: getModuleId(),
                },
              }}
            >
              <Button
                variant="text"
                sx={{
                  transition: "all ease 0.5s",
                  textTransform: "capitalize",
                  "&:hover": {
                    letterSpacing: "0.03em",
                  },
                }}
              >
                {t("View all")}
              </Button>
            </Link>
          )}
        </CustomStackFullWidth>
        <RTL direction={lanDirection}>
          <CustomBoxFullWidth
            sx={{
              paddingTop: { xs: "0px", sm: "20px" },
              padding: { xs: "10px", md: "20px" },
              backgroundColor: (theme) =>
                alpha(theme.palette.neutral[400], 0.1),
            }}
          >
            <>
              {isLoading ? (
                <Slider {...settings}>
                  {[...Array(2)].map((item, index) => {
                    return <SpecialOfferCardShimmer key={index} />;
                  })}
                </Slider>
              ) : (
                <Slider {...settings}>
                  {data?.products?.map((item, index) => {
                    return (
                      <ProductCard key={index} item={item} specialCard="true" />
                    );
                  })}
                </Slider>
              )}
            </>
          </CustomBoxFullWidth>
        </RTL>
      </CustomStackFullWidth>
    </HomeComponentsWrapper>
  );
};

export default SpecialFoodOffers;
