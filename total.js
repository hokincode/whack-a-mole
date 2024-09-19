// script.js
// still need to fix the inference block
let program= 'initialization'
let in_inference_mapping = false
let key_event = 'v'
let current_key_press = -1
let probability_of_inference_trial_occur = .3
let correct_wrong_image_show_time = 2000
let infer_trial_yes = 0
let music1 = document.querySelector(".music1")
let music2 = document.querySelector(".music2")
let music3 = document.querySelector(".music3")
let element = document.querySelector('.context_cue');
let each_trial_time = 500
let marmot_show_time = 1500
let set_of_stimuli = 2000
let number_of_trial = set_of_stimuli * 5
let trials_of_inference_block = 150
let min_trial_number_in_a_inference_block = 6
let max_trial_number_in_a_inference_block = 12
let number_of_inference_stimuli_mappings = 15
let hammer_show_time = marmot_show_time / 2
let inference_trial_time = 2500
let not_hit_yet = 1 // this is to only allow one hit
let empty = '<div><img src="image/img1.jpg"/></div>'
let show_mouse = `<img src="image/img1.jpg"/> <div class="mouse"><img src="image/mouse.png" 
style="transform: translateX(-37px) translateY(-90px) scale(1.8) !important;" class="mouse"/></div>`;
let render_hammer = `<img src="image/img1.jpg"/> <div class="hammer"><img src="image/hammer.png" 
style="transform: translateX(-90px) translateY(-130px) scale(2) !important;" class="hammer"/></div>`;
let show_mouse_and_hammer = `
<img src="image/img1.jpg"/>
<div class="mouse_and_hammer_together">
    <img src="image/mouse2.png" style="transform: translateX(-37px) translateY(-90px) scale(1.8) !important;" />
    <img src="image/hammer.png" style="transform: translateX(-90px) translateY(-130px) scale(2) !important;" />
</div>
`;

let inference_stimuli_sequence = generateValidInferenceSequence(number_of_inference_stimuli_mappings)
let mixture_sequence = generateValidInferenceSequence(number_of_inference_stimuli_mappings)
let array_or_number_of_training_trials_in_each_inference_mapping = distributeApples(number_of_inference_stimuli_mappings,
    trials_of_inference_block, min_trial_number_in_a_inference_block, max_trial_number_in_a_inference_block)
let array_or_number_of_mixture_training = distributeApples(number_of_inference_stimuli_mappings,
    trials_of_inference_block, min_trial_number_in_a_inference_block, max_trial_number_in_a_inference_block)

let pressedTime = ''
let trial_stimulus_number = '-1'
let start_game = document.querySelector(".start_game")
let criterion = [0, 0, 0, 0, 0]
let mapping_1 = [0, 1, 2, 3, 4]
let mapping_2 = [0, 1, 2, 3, 4]
let mapping_3 = [0, 1, 2, 3, 4]
let null_map = [-1, -1, -1, -1, -1]
create_all_mappings()
console.log('Initialization, mapping 1',mapping_1)
console.log('Initialization, mapping 2',mapping_2)
console.log('Initialization, mapping 3',mapping_3)

let current_map = null_map
let data = []; // data for each trial will be stored here
let score = document.querySelector(".score")
let trial = document.querySelector(".trial")
let score_number = 0
let trial_start_time = 0;
score.innerHTML = String(score_number)
// trial.innerHTML = String(0)

function create_all_mappings(){
    mapping_1 = shuffleArray(mapping_1)
    mapping_2 = shuffleArray(mapping_2)
    mapping_3 = shuffleArray(mapping_3)
}

async function playMusicLoop(music) {
  // Ensure that the music can loop
  music.loop = true;
  // Set the volume of the music
  music.volume = 0.1;
  // Play the music
  music.play();
}

function redirectToSecondPage() {
    start_game.style.top = '-100%'
    playMusicLoop(music1)
    run_experiment()
    document.addEventListener('keydown', handleKeyPress);
}

async function run_experiment() {
    program = 'training_mapping_1'
    await training_mapping_1() // rose
    program = 'training_mapping_2'
    await training_mapping_2() // blue
    program = 'training_mapping_3'
    await training_mapping_3() // purple
    program = 'mixture_training_mapping'
    await mixture_training_mapping()
    // there is a bug here; since at the end of mix training
    // we do not know which context it is in; thus, we are not able
    // to restore the format of the webpage
    // await training_mapping_1_recall()
    // await training_mapping_2_recall()
    // await training_mapping_3_recall()
    // program = 'entering_inference'
    // await entering_inference()
    // program = 'training_inference'
    // await training_inference()
    // program = 'leaving_inference'
    // await leaving_inference()
    program = 'mixture_training_mapping'
    await mixture_training_mapping()
    program = 'downloadArrayAsFile'
    await downloadArrayAsFile(data, 'data')
}



function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function training_mapping_1() {
    current_map = mapping_1
    criterion = [0, 0, 0, 0, 0]
    context_change_into_rose()
    let stimuli = generate_stimuli(set_of_stimuli);
    let i = 0;
    console.log('Stimuli Set', stimuli)
    while (i < number_of_trial && not_meet_criterion()) {
        console.log('Trial Number', i)
        trial_start_time = new Date().getTime();
        await one_training_trial_pilot(i, stimuli);
        // trial.innerHTML = String(i + 1)
        await delay(each_trial_time);
        not_hit_yet = 1;
        i = i + 1
    }
}

async function training_mapping_2() {
    current_map = mapping_2
    criterion = [0, 0, 0, 0, 0]
    rose_into_blue_context_change()
    let stimuli = generate_stimuli(set_of_stimuli);
    console.log('Stimuli Set', stimuli)
    let i = 0
    while (i < number_of_trial && not_meet_criterion()) {
        console.log('Trial Number', i)
        trial_start_time = new Date().getTime();
        await one_training_trial_pilot(i, stimuli);
        // trial.innerHTML = String(i + 1)
        await delay(each_trial_time);
        not_hit_yet = 1;
        i = i + 1
    }
}

async function training_mapping_3() {
    current_map = mapping_3
    criterion = [0, 0, 0, 0, 0]
    blue_into_purple_context_change()
    let stimuli = generate_stimuli(set_of_stimuli);
    let i = 0
    console.log('Stimuli Set', stimuli)
    while (i < number_of_trial && not_meet_criterion()) {
        console.log('Trial Number', i)
        trial_start_time = new Date().getTime();
        await one_training_trial_pilot(i, stimuli);
        // trial.innerHTML = String(i + 1)
        await delay(each_trial_time);
        not_hit_yet = 1;
        i = i + 1
    }
}

function not_meet_criterion() {
    console.log(criterion)
    for (let i = 0; i < criterion.length; i++) {
        if (criterion[i] <= 3) {
            return true;
        }
    }
    return false;
}

async function one_training_trial_pilot(tri, sti) {
    trial_stimulus_number = sti[tri]
    console.log('In one_training_trial_pilot, stimulus number' + trial_stimulus_number)
    document.querySelector('.game' + trial_stimulus_number).innerHTML = show_mouse
    await delay(marmot_show_time)
    document.querySelector('.game' + trial_stimulus_number).innerHTML = empty
}

const handleKeyPress = (event) => {
    pressedTime = new Date().getTime();
    console.log('In handleKeyPress, pressedTime', pressedTime)
    console.log('infer_trial_yes', infer_trial_yes)
    console.log('in_inference_mapping', in_inference_mapping)
    if (infer_trial_yes) {
        key_visualization_for_inference(event)
    } else if (in_inference_mapping){
        key_visualization_for_mapping_in_inference(event)
    } else {
        key_visualization_for_mapping(event)
    }
}

function key_visualization_for_inference(event){
    let current_mapping_number = query_find_current_mapping()
    let keyIndex = -1
    key_event = event.key
    switch (event.key) {
        case 'a':
            keyIndex = 1
            break
        case 's':
            keyIndex = 2
            break
        case 'd':
            keyIndex = 3
            break
    }
    // show_selected_context(keyIndex);
    if (current_mapping_number === keyIndex) {
        show_mapping_is_correct()
        infer_trial_yes = 0; // handle an infer key press
    } else if (keyIndex !== -1){
        show_mapping_is_wrong()
        infer_trial_yes = 0; // handle an infer key press
    }
    store_an_inference_trial_data();
}

function query_find_current_mapping(){
    if (current_map === mapping_1) {
        return 1
    }
    if (current_map === mapping_2) {
        return 2
    }
    if (current_map === mapping_3) {
         return 3
    }
    if (current_map === null_map) {
        return 0
    }
}

function key_visualization_for_mapping(event) {
    let keyIndex = '-1'
    let keep_displaying = 0
    key_event = event.key
    switch (event.key) {
        case 'h':
            keyIndex = current_map[0]
            break
        case 'u':
            keyIndex = current_map[1]
            break
        case 'i':
            keyIndex = current_map[2]
            break
        case 'l':
            keyIndex = current_map[3]
            break
        case 'b':
            keyIndex = current_map[4]
            break
    }
    current_key_press = keyIndex;
    if ((pressedTime - trial_start_time) < marmot_show_time && not_hit_yet) {
        keep_displaying = 1;
        not_hit_yet = 0;
    }
    if (keyIndex === trial_stimulus_number && keep_displaying) {
        score_number++
        criterion[trial_stimulus_number]++
        score.innerHTML = String(score_number)
        music3.play()
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = show_mouse_and_hammer
        }, 3)
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = empty
        }, 3 + hammer_show_time)
    } else if (keyIndex !== '-1' && keep_displaying) {
        music2.play()
        //criterion[trial_stimulus_number] = 0
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = render_hammer
        }, 3)
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = empty
        }, 3 + hammer_show_time)
    }
    store_a_mapping_trial_data();
}

function key_visualization_for_mapping_in_inference(event) {
    let keyIndex = '-1'
    let keep_displaying = 0
    console.log('should not display feedback')
    key_event = event.key
    switch (event.key) {
        case 'h':
            keyIndex = current_map[0]
            break
        case 'u':
            keyIndex = current_map[1]
            break
        case 'i':
            keyIndex = current_map[2]
            break
        case 'l':
            keyIndex = current_map[3]
            break
        case 'b':
            keyIndex = current_map[4]
            break
    }
    current_key_press = keyIndex;
    if ((pressedTime - trial_start_time) < marmot_show_time && not_hit_yet) {
        keep_displaying = 1;
        not_hit_yet = 0;
    }
    if (keyIndex === trial_stimulus_number && keep_displaying) {
        score_number++
        score.innerHTML = String(score_number)
        music3.play()
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = show_mouse_and_hammer
        }, 3)
        setTimeout(function () {
            document.querySelector('.game' + keyIndex).innerHTML = empty
        }, 3 + hammer_show_time)
    }
    store_a_mapping_trial_data();
}

function store_a_mapping_trial_data(){
    data.push({
      trial_type: 'm',
      key_event: key_event,
      thisTrialStartTime: trial_start_time,
      thisTrialMarmotShowTime: marmot_show_time,
      thisTrialKeyPressTime: pressedTime,
      thisTrialCurrentMap: current_map,
      thisTrialScoreNumber: score_number,
      thisTrialStimulusNumber: trial_stimulus_number,
      thisTrialMapNumber:query_find_current_mapping(current_map),
      thisTrialKeyPress: current_key_press,
      thisProgram: program,
  });
}

function store_an_inference_trial_data(){
    data.push({
      trial_type: 'i',
      key_event: key_event,
      thisTrialStartTime: trial_start_time,
      thisTrialKeyPressTime: pressedTime,
      thisTrialCurrentMap: current_map,
      thisTrialMapNumber:query_find_current_mapping(current_map),
      thisTrialKeyPress: current_key_press,
      thisProgram: program,
  });
}

function generate_stimuli(set_of_stimuli) {
    let temp = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < set_of_stimuli; j++) {
            temp.push(i);
        }
    }
    shuffleArray(temp)
    return temp
}

function generate_stimuli_for_inference_block(num_of_stimuli) {
    let n_of_sets = Math.floor(num_of_stimuli / 5);
    let temp = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < n_of_sets + 1; j++) { // you need one more set to actually cover all
            temp.push(i);
        }
    }
    shuffleArray(temp)
    let new_Arr;
    new_Arr = temp.slice(0, num_of_stimuli);
    return new_Arr
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    let j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

function context_change_into_rose(){
    if (element) {
        element.classList.remove('context_cue');
        element.classList.add('context_cue_rose');
    } else {
        console.log('In context_change_into_rose: Failed')
    }
}

function context_change_into_blue(){
    if (element) {
        element.classList.remove('context_cue');
        element.classList.add('context_cue_blue');
    } else {
        console.log('In context_change_into_blue: Failed')
    }
}

function context_change_into_purple(){
    if (element) {
        element.classList.remove('context_cue');
        element.classList.add('context_cue_purple');
    } else {
        console.log('In context_change_into_purple: Failed')
    }
}

// For fixing the problems in mixed trainings

function rose_into_blue_context_change(){
    if (element) {
        element.classList.remove('context_cue_rose');
        element.classList.add('context_cue_blue');
    } else {
        console.log('Change failed')
    }
}

function rose_into_purple_context_change(){
    if (element) {
        element.classList.remove('context_cue_rose');
        element.classList.add('context_cue_purple');
    } else {
        console.log('Change failed')
    }
}

function blue_into_rose_context_change(){
    if (element) {
        element.classList.remove('context_cue_blue');
        element.classList.add('context_cue_rose');
    } else {
        console.log('Change failed')
    }
}

function blue_into_purple_context_change(){
    if (element) {
        element.classList.remove('context_cue_blue');
        element.classList.add('context_cue_purple');
    } else {
        console.log('Change failed')
    }
}

function purple_into_blue_context_change(){
    if (element) {
        element.classList.remove('context_cue_purple');
        element.classList.add('context_cue_blue');
    } else {
        console.log('Change failed')
    }
}

function purple_into_rose_context_change(){
    if (element) {
        element.classList.remove('context_cue_purple');
        element.classList.add('context_cue_rose');
    } else {
        console.log('Change failed')
    }
}

function show_context(previous_context_number, current_contex_number) {
    if (previous_context_number === 1 && current_contex_number === 2){
        rose_into_blue_context_change()
    }
    if (previous_context_number === 1 && current_contex_number === 3){
        rose_into_purple_context_change()
    }
    if (previous_context_number === 2 && current_contex_number === 1) {
        blue_into_rose_context_change()
    }
    if (previous_context_number === 2 && current_contex_number === 3) {
        blue_into_purple_context_change()
    }
    if (previous_context_number === 3 && current_contex_number === 1) {
        purple_into_rose_context_change()
    }
    if (previous_context_number === 3 && current_contex_number === 2) {
        purple_into_blue_context_change()
    }
    if (previous_context_number === 0 && current_contex_number === 1) {
        context_change_into_rose()
    }
    if (previous_context_number === 0 && current_contex_number === 2) {
        context_change_into_blue()
    }
    if (previous_context_number === 0 && current_contex_number === 3) {
        context_change_into_purple()
    }
}

function context_entering_inference_block_make_null(number){
    if (element && number === 1) {
        element.classList.remove('context_cue_rose');
        element.classList.add('context_cue');
    } else if (element && number === 2) {
        element.classList.remove('context_cue_blue');
        element.classList.add('context_cue');
    } else if (element && number === 3) {
        element.classList.remove('context_cue_purple');
        element.classList.add('context_cue');
    } else {
        console.log('In context_entering_inference_block_make_null: failed')
    }
}

async function mixture_training_mapping() {
    for (let i = 0; i < mixture_sequence.length; i++) {
        previous_map_number = query_find_current_mapping()
        console.log('This map:', mixture_sequence[i])
        console.log('Previous map', previous_map_number)
        show_context(previous_map_number, mixture_sequence[i])
        current_map = getCurrentMapping(mixture_sequence[i])
        let num_of_trials_in_this_block = array_or_number_of_mixture_training[i]
        let stimuli_sequence_at_this_block = generate_stimuli_for_inference_block(num_of_trials_in_this_block)
        for (let j = 0; j < num_of_trials_in_this_block; j++){
            trial_start_time = new Date().getTime();
            await one_training_trial_pilot(j, stimuli_sequence_at_this_block);
            await delay(each_trial_time); // Wait for 5 seconds
            not_hit_yet = 1;
        }
    }
    last_number_number = query_find_current_mapping()
    console.log('last map', last_number_number)
    context_entering_inference_block_make_null(last_number_number)
    current_map = null_map
}

async function entering_inference(){
    show_inference_Image()
    await delay(10000)
    in_inference_mapping = true;
}

async function leaving_inference(){
    show_leaving_inference_Image()
    await delay(10000)
    in_inference_mapping = false;
}

async function training_inference() {
    let inference_trial_display_number = 1;
    for (let inference_index = 0; inference_index < inference_stimuli_sequence.length; inference_index++) {
        console.log('In training_inference, inference_stimuli_sequence', inference_stimuli_sequence)
        console.log('In training_inference, inference_index', inference_index)
        current_map = getCurrentMapping(inference_stimuli_sequence[inference_index])
        let num_of_trials_in_this_block = array_or_number_of_training_trials_in_each_inference_mapping[inference_index]
        let stimuli_sequence_at_this_block = generate_stimuli_for_inference_block(num_of_trials_in_this_block)
        // go into the inference block
        console.log('In training_inference, num_of_trials_in_this_block', num_of_trials_in_this_block)
        for (let j = 0; j < num_of_trials_in_this_block; j++){
            console.log('In training_inference, j of the trial', j)
            console.log('In training_inference, used mapping in this trial' + current_map)
            trial_start_time = new Date().getTime();
            await one_training_trial_pilot(j, stimuli_sequence_at_this_block);
            // trial.innerHTML = String(inference_trial_display_number)
            inference_trial_display_number = inference_trial_display_number + 1;
            await delay(each_trial_time); // Wait for 5 seconds
            not_hit_yet = 1;
            if (Math.random() < probability_of_inference_trial_occur) {
                await inference_trial_show_image();
            }
        }
    }
}

async function inference_trial_show_image(){
    infer_trial_yes = 1;
    show_infer_current_trial_image();
    await delay(inference_trial_time + correct_wrong_image_show_time)
}

function distributeApples(bagCount, totalApples, minApples, maxApples) {
    let bags = new Array(bagCount).fill(minApples); // Step 1
    let remainingApples = totalApples - bagCount * minApples; // Initially 60 in this case
    // Randomly distribute the remaining apples
    while (remainingApples > 0) {
        for (let i = 0; i < bagCount && remainingApples > 0; i++) {
            // Determine the max number that can be added to this bag
            let maxToAdd = Math.min(maxApples - bags[i], remainingApples);
            if (maxToAdd > 0) {
                let add = Math.floor(Math.random() * maxToAdd) + 1;
                bags[i] += add;
                remainingApples -= add;
            }
        }
    }
    let currentTotal = bags.reduce((acc, val) => acc + val, 0);
    if (currentTotal !== totalApples) {
        console.error("In distributeApples, Total apples mismatch. Adjust the distribution logic.");
    }
    return bags;
}

function isValidSequence(sequence) {
    for (let i = 1; i < sequence.length; i++) {
        if (sequence[i] === sequence[i - 1]) {
            return false;
        }
    }
    return true;
}

function generateValidInferenceSequence(n) {
    if (n % 3 !== 0) throw new Error("n must be divisible by 3.");
    // Initialize the sequence with equal numbers of 1, 2, and 3.
    let sequence = Array.from({ length: n }, (_, index) => 1 + index % 3);
    // Shuffle until the sequence is valid (no consecutive numbers are the same).
    do {
        shuffleArray(sequence);
    } while (!isValidSequence(sequence));
    return sequence;
}

function getCurrentMapping(i) {
    let selectedMapping;
    if (i === 1) {
        selectedMapping = mapping_1;
    } else if (i === 2) {
        selectedMapping = mapping_2;
    } else if (i === 3) {
        selectedMapping = mapping_3;
    } else {
        selectedMapping = null; // Or any default value you prefer
    }
    return selectedMapping;
}

async function downloadArrayAsFile(array, filename) {
    // Convert the array to a string format (e.g., JSON)
    const jsonString = JSON.stringify(array);
    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], {type: "application/json"});
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a temporary anchor (`a`) element
    const a = document.createElement("a");
    // Set the download attribute of the anchor to the filename
    a.download = filename;
    // Set the href of the anchor to the Blob URL
    a.href = url;
    // Append the anchor to the document body temporarily
    document.body.appendChild(a);
    // Trigger the download by simulating a click on the anchor
    a.click();
    // Clean up by removing the temporary anchor and revoking the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Function to show inference image
function show_inference_Image() {
  // Get the image container
  const container = document.getElementById('inference-image-container');
  // Create an image element
  const img = document.createElement('img');
  img.src = 'image/to_start_inference_block.jpg'; // The relative path to your local image
  img.alt = 'inference instruction'; // Alternative text for the image
  // Add the image to the container
  container.appendChild(img);
  // Remove the image after 5 seconds (5000 milliseconds)
  setTimeout(() => {
    img.remove();
  }, 8000);
}

// function to show leaving inference block image
function show_leaving_inference_Image() {
  // Get the image container
  const container = document.getElementById('inference-image-container');
  // Create an image element
  const img = document.createElement('img');
  img.src = 'image/end_inference.jpg'; // The relative path to your local image
  img.alt = 'inference leaving instruction'; // Alternative text for the image
  // Add the image to the container
  container.appendChild(img);
  // Remove the image after 5 seconds (5000 milliseconds)
  setTimeout(() => {
    img.remove();
  }, 8000);
}

// Function to show infer current block image
function show_infer_current_trial_image() {
  // Get the image container
  const container = document.getElementById('infer-current-container');
  // Create an image element
  const img = document.createElement('img');
  img.src = 'image/infer_current_mapping.jpg'; // The relative path to your local image
  img.alt = 'infer current block'; // Alternative text for the image
  // Add the image to the container
  container.appendChild(img);
  // Remove the image after 5 seconds (5000 milliseconds)
  setTimeout(() => {
    img.remove();
  }, inference_trial_time);
}

function show_mapping_is_correct() {
  // Get the image container
  const container = document.getElementById('correct-container');
  // Create an image element
  const img = document.createElement('img');
  img.src = 'image/correct.jpg'; // The relative path to your local image
  img.alt = 'correct'; // Alternative text for the image
  // Add the image to the container
  container.appendChild(img);
  // Remove the image after 5 seconds (5000 milliseconds)
  setTimeout(() => {
    img.remove();
  }, correct_wrong_image_show_time);
}

function show_mapping_is_wrong() {
  // Get the image container
  const container = document.getElementById('wrong-container');
  // Create an image element
  const img = document.createElement('img');
  img.src = 'image/wrong.jpg'; // The relative path to your local image
  img.alt = 'correct'; // Alternative text for the image
  // Add the image to the container
  container.appendChild(img);
  // Remove the image after 5 seconds (5000 milliseconds)
  setTimeout(() => {
    img.remove();
  }, correct_wrong_image_show_time);
}

function show_selected_context(context_number) {
  if (context_number === 1) {
      context_change_into_rose();
  }
  if (context_number === 2) {
      context_change_into_blue()
  }
  if (context_number === 3) {
      context_change_into_purple()
  }
  setTimeout(() => {
    context_entering_inference_block_make_null();
  }, correct_wrong_image_show_time);
}

async function training_mapping_1_recall() {
    context_change_into_rose_recall()
    let stimuli = generate_stimuli(set_of_stimuli);
    let i = 0;
    console.log('Stimuli Set', stimuli)
    while (i < number_of_trial && not_meet_criterion_recall()) {
        console.log('Trial Number', i)
        trial_start_time = new Date().getTime();
        await one_training_trial_pilot(i, stimuli);
        // trial.innerHTML = String(i + 1)
        await delay(each_trial_time);
        not_hit_yet = 1;
        i = i + 1
    }
}

async function training_mapping_2_recall() {
    current_map = mapping_2
    criterion = [0, 0, 0, 0, 0]
    context_change_into_blue()
    let stimuli = generate_stimuli(set_of_stimuli);
    console.log('Stimuli Set', stimuli)
    let i = 0
    while (i < number_of_trial && not_meet_criterion_recall()) {
        console.log('Trial Number', i)
        trial_start_time = new Date().getTime();
        await one_training_trial_pilot(i, stimuli);
        // trial.innerHTML = String(i + 1)
        await delay(each_trial_time);
        not_hit_yet = 1;
        i = i + 1
    }
}

async function training_mapping_3_recall() {
    current_map = mapping_3
    criterion = [0, 0, 0, 0, 0]
    context_change_into_purple()
    let stimuli = generate_stimuli(set_of_stimuli);
    let i = 0
    console.log('Stimuli Set', stimuli)
    while (i < number_of_trial && not_meet_criterion_recall()) {
        console.log('Trial Number', i)
        trial_start_time = new Date().getTime();
        await one_training_trial_pilot(i, stimuli);
        // trial.innerHTML = String(i + 1)
        await delay(each_trial_time);
        not_hit_yet = 1;
        i = i + 1
    }
}

function not_meet_criterion_recall() {
    console.log(criterion)
    for (let i = 0; i < criterion.length; i++) {
        if (criterion[i] <= 3) {
            return true;
        }
    }
    return false;
}

function context_change_into_rose_recall(){
    if (element) {
        element.classList.remove('context_cue_purple');
        element.classList.add('context_cue_rose');
    } else {
        console.log('In context_change_into_rose: Failed')
    }
}