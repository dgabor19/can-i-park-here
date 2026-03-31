import { CuratedPlayer } from "@/types";

export const curatedPlayers: CuratedPlayer[] = [
  {
    id: "cristiano-ronaldo",
    name: "Cristiano Ronaldo",
    searchName: "Cristiano Ronaldo",
    nationality: "Portugal",
    kids: [
      {
        name: "Cristiano Ronaldo Jr.",
        birthYear: 2010,
        note: "Born via surrogate in the US. Already training with youth academies.",
      },
      {
        name: "Eva Maria",
        birthYear: 2017,
        note: "Twin, born via surrogate alongside Mateo.",
      },
      {
        name: "Mateo",
        birthYear: 2017,
        note: "Twin, born via surrogate alongside Eva.",
      },
      {
        name: "Alana Martina",
        birthYear: 2017,
        note: "Born to Ronaldo and his partner Georgina Rodríguez in November 2017.",
      },
      {
        name: "Bella Esmeralda",
        birthYear: 2022,
        note: "Born in April 2022. Twin brother did not survive birth.",
      },
    ],
  },
  {
    id: "lionel-messi",
    name: "Lionel Messi",
    searchName: "Lionel Messi",
    nationality: "Argentina",
    kids: [
      {
        name: "Thiago Messi",
        birthYear: 2012,
        note: "Messi's first son. Already showing football skills at youth level.",
      },
      {
        name: "Mateo Messi",
        birthYear: 2015,
        note: "Known for his cheeky personality, often seen celebrating alongside his dad.",
      },
      {
        name: "Ciro Messi",
        birthYear: 2018,
        note: "Born during the 2018 World Cup year. Named after a god of fire.",
      },
    ],
  },
  {
    id: "david-beckham",
    name: "David Beckham",
    searchName: "David Beckham",
    nationality: "England",
    kids: [
      {
        name: "Brooklyn Beckham",
        birthYear: 1999,
        note: "Eldest son, now a professional photographer and married to actress Nicola Peltz.",
      },
      {
        name: "Romeo Beckham",
        birthYear: 2002,
        note: "Pursued a career in football and modelling. Played for Inter Miami's reserve side.",
      },
      {
        name: "Cruz Beckham",
        birthYear: 2005,
        note: "Aspiring musician who has released singles.",
      },
      {
        name: "Harper Seven Beckham",
        birthYear: 2011,
        note: "The only daughter, named Harper Seven — seven was David's shirt number.",
      },
    ],
  },
  {
    id: "zinedine-zidane",
    name: "Zinedine Zidane",
    searchName: "Zinedine Zidane",
    nationality: "France",
    kids: [
      {
        name: "Enzo Zidane",
        birthYear: 1995,
        note: "Professional footballer who played as a midfielder in Spain.",
      },
      {
        name: "Luca Zidane",
        birthYear: 1998,
        note: "Professional goalkeeper who has played in LaLiga.",
      },
      {
        name: "Theo Zidane",
        birthYear: 2002,
        note: "Also a footballer, following in his father's footsteps.",
      },
      {
        name: "Elyaz Zidane",
        birthYear: 2005,
        note: "The youngest of the four sons, starting his football journey.",
      },
    ],
  },
  {
    id: "ronaldo-nazario",
    name: "Ronaldo Nazário",
    searchName: "Ronaldo Nazario",
    nationality: "Brazil",
    kids: [
      {
        name: "Ronald",
        birthYear: 2000,
        note: "Eldest son from his first relationship.",
      },
      {
        name: "Maria",
        birthYear: 2004,
        note: "His daughter, born to model Daniela Cicarelli.",
      },
      {
        name: "Alex",
        birthYear: 2005,
        note: "Born to Brazilian model Michelle Umezu.",
      },
      {
        name: "Asia",
        birthYear: 2008,
        note: "Born to model Bia Antony.",
      },
      {
        name: "Bem",
        birthYear: 2021,
        note: "Youngest child, whose name means 'well-being' in Portuguese.",
      },
    ],
  },
  {
    id: "neymar",
    name: "Neymar Jr.",
    searchName: "Neymar",
    nationality: "Brazil",
    kids: [
      {
        name: "Davi Lucca",
        birthYear: 2011,
        note: "Born to Carolina Dantas. Davi is often seen at his father's matches.",
      },
      {
        name: "Mavie",
        birthYear: 2023,
        note: "Born to Amanda Kimberlly in October 2023.",
      },
    ],
  },
  {
    id: "roberto-carlos",
    name: "Roberto Carlos",
    searchName: "Roberto Carlos",
    nationality: "Brazil",
    kids: [
      {
        name: "Giovanna",
        birthYear: 1994,
        note: "Eldest daughter from his first marriage.",
      },
      {
        name: "Luizinho",
        birthYear: 1996,
        note: "Son who has shown interest in football.",
      },
      {
        name: "Giulia",
        birthYear: 2004,
        note: "Daughter born during his time at Real Madrid.",
      },
      {
        name: "Cauã",
        birthYear: 2010,
        note: "Youngest son, born after Roberto Carlos moved to Fenerbahçe.",
      },
    ],
  },
  {
    id: "ronaldinho",
    name: "Ronaldinho",
    searchName: "Ronaldinho",
    nationality: "Brazil",
    kids: [
      {
        name: "João",
        birthYear: 2005,
        note: "Born to Janaina Mendes. Grew up watching his father dazzle the world.",
      },
      {
        name: "João Pedro",
        birthYear: 2012,
        note: "Born to Priscilla Coelho. Both sons share the same name João.",
      },
    ],
  },
  {
    id: "wayne-rooney",
    name: "Wayne Rooney",
    searchName: "Wayne Rooney",
    nationality: "England",
    kids: [
      {
        name: "Kai Wayne Rooney",
        birthYear: 2009,
        note: "Eldest son. Already showing an interest in football.",
      },
      {
        name: "Klay Anthony Rooney",
        birthYear: 2011,
        note: "Second son, named after NBA star Klay Thompson.",
      },
      {
        name: "Kit Joseph Rooney",
        birthYear: 2016,
        note: "Third son born to Wayne and Coleen.",
      },
      {
        name: "Cass Mac Rooney",
        birthYear: 2018,
        note: "Youngest son of the Rooney family.",
      },
    ],
  },
  {
    id: "kylian-mbappe",
    name: "Kylian Mbappé",
    searchName: "Kylian Mbappe",
    nationality: "France",
    kids: [],
  },
];

export function getCuratedPlayerById(id: string): CuratedPlayer | undefined {
  return curatedPlayers.find((p) => p.id === id);
}
