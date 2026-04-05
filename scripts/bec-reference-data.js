/**
 * Official BEC (Biroul Electoral Central) 2024 data for Bârnova Commune, Iași County.
 * Source: rezultate.roaep.ro / prezenta.roaep.ro / expertforum.ro
 * This serves as a validated reference and fallback.
 */
const BEC_DATA_BARNOVA_2024 = {
  primar: {
    winner: "BALAN MIHAI",
    party: "PARTIDUL NAȚIONAL LIBERAL",
    votes: 1456,
    percentage: 37.65,
    // Full list of candidates for potential future drill-down UI
    candidates: [
      { name: "BALAN MIHAI", party: "PNL", votes: 1456, percentage: 37.65 },
      { name: "TINCU GEORGEL-DANIEL", party: "PSD", votes: 957, percentage: 24.74 },
      { name: "STRATULAT-PETERCĂ EMMA-CECILIA", party: "USR", votes: 831, percentage: 21.48 },
      { name: "COLOTIN SEBASTIAN", party: "S.O.S. ROMÂNIA", votes: 286, percentage: 7.39 },
      { name: "LUCA CONSTANTIN", party: "PARTIDUL VERDE", votes: 133, percentage: 3.43 },
      { name: "HARAGA IOAN", party: "AUR", votes: 83, percentage: 2.14 },
      { name: "PÎNZARU CRISTIAN", party: "RECO", votes: 62, percentage: 1.60 },
      { name: "NECHIFOR DAN-MIHĂIŢĂ", party: "INDEPENDENT", votes: 38, percentage: 0.98 },
      { name: "RĂDUCANU ANTOANELLA-NICOLETA", party: "PMP", votes: 21, percentage: 0.54 }
    ]
  },
  consiliu_local: {
    total_mandates: 15,
    // Party distribution of mandates
    parties: [
      { party: "PARTIDUL NAȚIONAL LIBERAL", votes: 1286, percentage: 33.13, mandates: 5 },
      { party: "PARTIDUL SOCIAL DEMOCRAT", votes: 894, percentage: 23.03, mandates: 4 },
      { party: "UNIUNEA SALVAȚI ROMÂNIA", votes: 889, percentage: 22.90, mandates: 4 },
      { party: "PARTIDUL S.O.S. ROMÂNIA", votes: 306, percentage: 7.88, mandates: 1 },
      { party: "PARTIDUL VERDE", votes: 242, percentage: 6.23, mandates: 1 }
    ],
    // Validated list of councilors who received mandates
    members: [
      { name: "RUSU CONSTANTIN-LUCIAN", party: "PNL" },
      { name: "ACATRINEI FLORIN", party: "PNL" },
      { name: "LUCA CONSTANTIN-CRISTIAN", party: "PNL" },
      { name: "CIOBANU MIRCEA", party: "PNL" },
      { name: "LUCA CĂTĂLIN-IONUŢ", party: "PNL" },
      { name: "TINCU GEORGEL-DANIEL", party: "PSD" },
      { name: "POPA DAN-CONSTANTIN", party: "PSD" },
      { name: "LUCA FĂNICĂ", party: "PSD" },
      { name: "VORNICU FLORIN", party: "PSD" },
      { name: "STRATULAT-PETERCĂ EMMA-CECILIA", party: "USR" },
      { name: "DUMITRU RADU", party: "USR" },
      { name: "ȘOȘU GEORGETA-IULIANA", party: "USR" },
      { name: "COBZARU IONUȚ-CĂTĂLIN", party: "USR" },
      { name: "COLOTIN SEBASTIAN", party: "S.O.S. ROMÂNIA" },
      { name: "COVALIU LIDIA-CAMELIA", party: "PARTIDUL VERDE" }
    ]
  }
};

module.exports = BEC_DATA_BARNOVA_2024;
