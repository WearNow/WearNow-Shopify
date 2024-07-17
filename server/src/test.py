import json
import random

# Desired attributes
genders = ['male', 'female']
skin_colors = ['PHI-Male', 'PHI-Female', 'EGY-Female', 'MX-Male', 'GR-Male']
sizes = ['S', 'M', 'L']

# Function to filter and sample the models


# Function to filter and sample the models
def filter_and_sample_models(data, genders, skin_colors, sizes):
    sampled_models = []

    for gender in genders:
        for skin_color in skin_colors:
            for size in sizes:
                # Filter the models based on current attributes
                filtered_models = [
                    model for model in data['pretrained_models']
                    if model['gender'] == gender and model['skin_composition'] == skin_color and model['size'] == size
                ]

                # If there are any models left after filtering, sample two
                if len(filtered_models) >= 2:
                    sampled_models.extend(random.sample(filtered_models, 2))
                elif len(filtered_models) == 1:
                    sampled_models.append(filtered_models[0])

    return sampled_models


if __name__ == "__main__":
    data = json.load(open("./models.json", "r+"))["data"]
    # Call the function and get the sampled models
    sampled_models = filter_and_sample_models(
        data, genders, skin_colors, sizes)
    data = json.dump(sampled_models, open("./clean_set.json", "a+"))

    # Print the sampled models
    print(len(sampled_models))
