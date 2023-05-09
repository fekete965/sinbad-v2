import Link from "next/link";
import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Grid } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H6 } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "lib";
import productVariants from "data/product-variants";
import ProductImageViewer from "components/products-components/ProductImageViewer";
import ProductPageImportedProduct from "components/products-components/ProductPageImportedProduct";

// ================================================================

// ================================================================

const ProductIntro = ({ product, productImages }) => {
  const {
    id,
    product_price,
    product_name,
    product_short_description,
    shop_name,
    slug,
    thumbnail,
  } = product;
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectVariants, setSelectVariants] = useState({
    option: "option 1",
    type: "type 1",
  });

  // HANDLE CHAMGE TYPE AND OPTIONS
  // const handleChangeVariant = (variantName, value) => () => {
  //   setSelectVariants((state) => ({
  //     ...state,
  //     [variantName.toLowerCase()]: value,
  //   }));
  // };

  // CHECK PRODUCT EXIST OR NOT IN THE CART
  const cartItem = state.cart.find((item) => item.id === id);

  // HANDLE SELECT IMAGE
  const handleImageClick = (ind) => () => setSelectedImage(ind);

  // HANDLE CHANGE CART
  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price: product_price,
        qty: amount,
        name: product_name,
        imgUrl: thumbnail,
        id,
        slug,
      },
    });
  };
  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">

      <ProductImageViewer productImages={productImages} product={product} />
        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={1}>{product_name}</H1>

          <FlexBox alignItems="center" mb={1}>
            <H6>{product_short_description}</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">تقييم:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={4}
                readOnly
              />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox>

          {/* {productVariants.map((variant) => (
            <Box key={variant.id} mb={2}>
              <H6 mb={1}>{variant.product_name}</H6>

              {variant.values.map(({ id, value }) => (
                <Chip
                  key={id}
                  label={value}
                  onClick={handleChangeVariant(variant.title, value)}
                  sx={{
                    borderRadius: "4px",
                    mr: 1,
                    cursor: "pointer",
                  }}
                  color={
                    selectVariants[variant.title.toLowerCase()] === value
                      ? "primary"
                      : "default"
                  }
                />
              ))}
            </Box>
          ))} */}

          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {product_price}
              {/* {currency(product_price)} */}
            </H2>
            <Box color="inherit">Stock Available</Box>
          </Box>

         {product.is_global == 1 && <ProductPageImportedProduct product={product} />}

          {!cartItem?.qty ? (
            <Button
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
              sx={{
                mb: 4.5,
                mt: 2.5,
                px: "1.75rem",
                height: 40,
              }}
            >
              Add to Cart
            </Button>
          ) : (
                <FlexBox alignItems="center" mb={4.5} mt={2.5}>
              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Add fontSize="small" />
              </Button>
            </FlexBox>
          )}

          {shop_name.length > 1 && (
            <FlexBox alignItems="center" mb={2}>
              <Box>المتجر:</Box>
              <Link href="/" passHref>
                <a>
                  <H6 ml={1}>{shop_name}</H6>
                </a>
              </Link>
            </FlexBox>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProductIntro;
