<template>
    <div class="container">
        <h2>{{ourCafesTitle}}</h2>
        <div class="row">
            <div v-for="(ourCafe,index) in ourCafes" class="col-md-6" :key="index">
                <div class="cafe-image-tile js-scroll-to-map" :data-address="model(ourCafe).dataAddress">
                    <div class="cafe-image-tile-image-wrapper" :style="{ backgroundImage: model(ourCafe).imageLink, backgroundSize: 'cover', backgroundPosition: 'right' }">
                </div>
                <div class="cafe-image-tile-content">
                    <h3 class="cafe-image-tile-name">{{model(ourCafe).name}}</h3>
                    <address class="cafe-tile-address">
                <span :name="model(ourCafe).name" class="cafe-tile-address-anchor">
                  {{model(ourCafe).street}}, {{model(ourCafe).city}}<br />{{model(ourCafe).zipCode}}, {{model(ourCafe).countryWithState}}
                </span>
                    </address>
                    <p>{{model(ourCafe).phone}}</p>
                </div>
            </div>
        </div>
        </div>
        <h2>{{partnerCafesTitle}}</h2>
        <div class="row">
            <div v-for="(location, locationIndex) in locations" :key="locationIndex">
                <h3>{{location}}</h3>
                <p
                        v-for="(partnerCafeModel, index) in partnerCafes.map(function(cafe){return model(cafe);})"
                        v-if="partnerCafeModel.location === location"
                        :key="index">
                    {{partnerCafeModel.name}}, {{partnerCafeModel.street}}, {{partnerCafeModel.phone}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import CafeStore from '../Stores/Cafe';

    export default {
        name: "Cafes",
        data: () => ({
            ourCafesTitle: "Our cafes",
            partnerCafesTitle: "Other places where you can drink our coffee",
            ourCafes: [],
            partnerCafes: [],
        }),
        computed: {
          locations: function(){
              let models = this.partnerCafes.map(cafe => this.model(cafe));
              return  models.map((model) => model.location).reduce((result, location) => {
                  if (result.indexOf(location) < 0) {
                      result.push(location);
                  }

                  return result;
              }, []).sort();
          }
        },
        methods: {
            //TODO make model computed?
            model: function(cafe){
                let model = {
                    name: cafe.system.name,
                    imageLink: "url(" + cafe.photo.value[0].url + ")",
                    street: cafe.street.value,
                    city: cafe.city.value,
                    zipCode: cafe.zipCode.value,
                    country: cafe.country.value,
                    state: cafe.state.value,
                    phone: cafe.phone.value,

                }
                model.dataAddress = model.city + ", " + model.street;
                model.countryWithState = model.country + (model.state ? ", " + model.state : "");
                model.location = model.city + ", " + model.countryWithState;
                return model;
            }
        },
        created: function(){
            CafeStore.getCompanyCafes('en-US').then(companyCafes => this.ourCafes = companyCafes);
            CafeStore.getPartnerCafes('en-US').then(partnerCafes => this.partnerCafes = partnerCafes);
        }
    }
</script>