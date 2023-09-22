export const pointsListData = [
  {
    name: "Femur Center",
    location: [22.51952805285013, 1.807570614394262, -200],
  },
  {
    name: "Hip Center",
    location: [-2.410465095005101, -6.028019308632512, 220.559623361444867],
  },
  {
    name: "Medical Epicondyle",
    location: [-19.86400437454707, 12, -182.9260914026463],
  },
  {
    name: "Lateral Epicondyle",
    location: [62.9095703607903, 10, -190.4742024868783],
  },
  { name: "Distal Medical Pt", location: [-4, 13, -207] },
  { name: "Distal Lateral Pt", location: [48, 19, -210] },
  { name: "Femur Proximal Canal", location: [0, 0, -36] },
  { name: "Femur Distal Canal", location: [-11, 0, 49] },
  {
    name: "Posterior Medical Pt",
    location: [3.819062474672881, -21.39094555805142, -193.4888607951557],
  },
  {
    name: "Posterior Lateral Pt",
    location: [40, -14, -195.4888607951557],
  },
];
[-11.655854602554914, -5.983996754547499, 5.276212095569361];

export const lineList = [
  {
    name: "Mechanical Axis",
    start: 0,
    end: 1,
    color: "blue",
  },
  {
    name: "Anatomical Axis",
    start: 2,
    end: 3,
    color: "red",
  },
  {
    name: "TEA - Trans Epicondyle Axis",
    start: 4,
    end: 5,
    color: "orange",
  },
  {
    name: "PCA - Postrerior Condyle Axis",
    start: 8,
    end: 9,
    color: "green",
  },
  {
    name: "PCA - Postrerior Condyle Axis",
    start: 6,
    end: 7,
    color: "green",
  },
];

export const stepList = [
  { step: 1, name: "Plane Perpendicar To Mechanical Axis" },
  {
    step: 2,
    name: "Anterior Line",
    features: "perpendicular to projected TEA line ",
  },
  {
    step: 3,
    name: "create Varus/Valgus plane",
    features: "it rotates around anterior line",
  },
  { step: 4, name: "Project Anterior line to Varus/Valgys plane" },
  { step: 5, name: "Line Perpendicular to Anterior line " },
  { step: 6, name: "plane with Flexion/Extension Plane " },
  {
    step: 7,
    name: "plane parallel to  Flexion/Extension Plane caled distal medical Plane ",
  },
  {
    step: 8,
    name: "distal Resection cube ,distal Resection Plane at 10 mm distance",
  },
];
