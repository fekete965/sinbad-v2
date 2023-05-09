import { Box, Grid } from "@mui/material";
import ProductCard1 from "components/product-cards/ProductCard1";
import { H3 } from "components/Typography";
// ===================================================

const RelatedProducts = ({ productsData }) => {
  return (
    <Box mb={7.5}>
      <H3 mb={3}>Realted Products</H3>
      <Grid container spacing={8}>
        {productsData.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1
              id={item.id}
              slug={item.id}
              title={item.product_name}
              price={item.product_price}
              // rating={item.rating}
              imgUrl={`https://sinbad-store.com${item.thumb}`}
              discount={item.discount}
              hoverEffect
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default RelatedProducts;
