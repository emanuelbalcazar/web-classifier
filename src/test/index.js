var natural = require('natural');

var classifier = new natural.BayesClassifier();

let wiki = `
Animals are multicellular eukaryotic organisms that form the biological kingdom Animalia. With few exceptions, animals consume organic material, breathe oxygen, are able to move, can reproduce sexually, and grow from a hollow sphere of cells, the blastula, during embryonic development. Over 1.5 million living animal species have been described—of which around 1 million are insects—but it has been estimated there are over 7 million animal species in total. Animals range in length from 8.5 millionths of a metre to 33.6 metres (110 ft) and have complex interactions with each other and their environments, forming intricate food webs. The category includes humans, but in colloquial use the term animal often refers only to non-human animals. The study of non-human animals is known as zoology.

Most living animal species are in the Bilateria, a clade whose members have a bilaterally symmetric body plan. The Bilateria include the protostomes—in which many groups of invertebrates are found, such as nematodes, arthropods, and molluscs—and the deuterostomes, containing the echinoderms and chordates (including the vertebrates). Life forms interpreted as early animals were present in the Ediacaran biota of the late Precambrian. Many modern animal phyla became clearly established in the fossil record as marine species during the Cambrian explosion which began around 542 million years ago. 6,331 groups of genes common to all living animals have been identified; these may have arisen from a single common ancestor that lived 650 million years ago.

Aristotle divided animals into those with blood and those without. Carl Linnaeus created the first hierarchical biological classification for animals in 1758 with his Systema Naturae, which Jean-Baptiste Lamarck expanded into 14 phyla by 1809. In 1874, Ernst Haeckel divided the animal kingdom into the multicellular Metazoa (now synonymous with Animalia) and the Protozoa, single-celled organisms no longer considered animals. In modern times, the biological classification of animals relies on advanced techniques, such as molecular phylogenetics, which are effective at demonstrating the evolutionary relationships between animal taxa.

Humans make use of many other animal species for food, including meat, milk, and eggs; for materials, such as leather and wool; as pets; and as working animals for power and transport. Dogs have been used in hunting, while many terrestrial and aquatic animals are hunted for sport. Non-human animals have appeared in art from the earliest times and are featured in mythology and religion.
`;

let geo = `
Geography (from Greek: γεωγραφία, geographia, literally "earth description")[1] is a field of science devoted to the study of the lands, features, inhabitants, and phenomena of the Earth and planets.[2] The first person to use the word γεωγραφία was Eratosthenes (276–194 BC).[3] Geography is an all-encompassing discipline that seeks an understanding of Earth and its human and natural complexities—not merely where objects are, but also how they have changed and come to be.

Geography is often defined in terms of two branches: human geography and physical geography.[4][5] Human geography deals with the study of people and their communities, cultures, economies, and interactions with the environment by studying their relations with and across space and place.[6] Physical geography deals with the study of processes and patterns in the natural environment like the atmosphere, hydrosphere, biosphere, and geosphere.

The four historical traditions in geographical research are: spatial analyses of natural and the human phenomena, area studies of places and regions, studies of human-land relationships, and the Earth sciences.[7] Geography has been called "the world discipline"[8] and "the bridge between the human and the physical sciences".[9]
`;

natural.LancasterStemmer.attach();

let text = wiki.tokenizeAndStem();

// teach it positive phrases
classifier.addDocument('animals', 'animal')
classifier.addDocument('organisms', 'animal')
classifier.addDocument('researches', 'geography')
classifier.train();

let score = classifier.getClassifications(text);
console.log(score);
