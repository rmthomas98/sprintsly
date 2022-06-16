import { NextPage } from "next";
import { PricingPlans } from "../components/PricingPlans/PricingPlans";
import { Footer } from "../components/Footer/Footer";
import Head from "next/head";

const Pricing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sprintsly | Pricing Plans</title>
      </Head>
      <PricingPlans />
      <Footer />
    </>
  );
};

export default Pricing;
