export const ApiRouteBuilder = {
  Offers: () => '/offers',
  Login: () => '/login',
  Logout: () => '/logout',
  Offer: (offerId: string) => `/offers/${offerId}`,
  OffersNearby: (offerId: string) => `/offers/${offerId}/nearby`,
  Reviews: (offerId: string) => `/comments/${offerId}`,
  SendReview: (offerId: string) => `/comments/${offerId}`,
};

export default ApiRouteBuilder;
