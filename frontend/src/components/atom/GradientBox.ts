import styled from "@emotion/styled";

const GradientBox = styled("div")(({ theme }) => {

  return {
    border: "6px solid",
    borderImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main}) 1`,
  }
})

export default GradientBox;