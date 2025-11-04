import React from 'react'
import InfoBox from '../components/InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
             heading="for Renters"
              backgroundColor="bg-gray-100"
              textColor="text-gray-800"
              buttonInfo={{
                text: "Browse Rentals",
                link: "/properties",
                backgroundColor: "bg-black",
              }}
          >
            Find your perfect rental property from our extensive listings. Whether youre looking for an apartment, condo, house, or studio, we have options to suit every need and budget.
          </InfoBox>
          <InfoBox
             heading="Add Your Property"
             backgroundColor='bg-blue-100'
              textColor='text-gray-800'
             buttonInfo={
              {
                text:'Add property',
                link:'properties/add-property',
                backgroundColor:'bg-blue-500'
              }
             }
          >
             List your property with us and reach a wide audience of potential renters. Our easy-to-use platform makes it simple to showcase your propertys best features and attract quality tenants.
          </InfoBox>
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes