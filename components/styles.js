export const colors = {
  lightBlue: '#7FC4FD',
  darkBlue: '#2699FB',
  white: '#fff',
};

export const card = {
  display: 'flex',
  backgroundColor: colors.white,
  borderRadius: 4,
  height: 200,
  width: '100%',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  shadowOpacity: 0.4,
};

export const cardHeader = {
  backgroundColor: colors.lightBlue,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: '100%',
  height: 65,
};

export const boldWhite = {
  fontWeight: 'bold',
  color: colors.white,
  textAlign: 'center',
};

export const boldBlue = {
  fontWeight: 'bold',
  color: colors.darkBlue,
  textAlign: 'center',
};

export const container = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: colors.darkBlue,
};

export const interiorContainer = {
  display: 'flex',
  marginTop: 60,
};

export const cardContainer = {
  position: 'absolute',
  height: 220,
  bottom: 20,
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const foodCard = {
  backgroundColor: '#fff',
  borderRadius: 4,
  marginVertical: 3,
  padding: 10,
  width: '95%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  shadowOpacity: 0.2,
};

export const foodTitle = {
  color: colors.darkBlue,
  fontWeight: 'bold',
  fontSize: 15,
};

export const cardBody = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

export const restaurantCard = {
  display: 'flex',
  backgroundColor: '#fff',
  borderRadius: 4,
  height: 200,
  // height: 400,
  width: '100%',
  marginVertical: 15,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  shadowOpacity: 0.4,
};

export const horizontalCardStrip = {
  position: 'absolute',
  bottom: 20,
};

export const row = {
  display: 'flex',
  width: '100%',
  paddingHorizontal: 135,
  flexDirection: 'row',
  justifyContent: 'space-around',
};
