window.function = async function(api_key, model, input, voice, response_format, speed) {
    // Validate API Key
    if (!api_key.value) {
        return "Error: OpenAI API Key is required.";
    }

    // Validate Required Parameters
    if (!model.value) {
        return "Error: Model is required.";
    }
    if (!input.value) {
        return "Error: Input text is required.";
    }
    if (!voice.value) {
        return "Error: Voice is required.";
    }

    // Construct request payload
    const payload = {
        model: model.value,
        input: input.value,
        voice: voice.value
    };

    // Add optional parameters if provided
    if (response_format.value) payload.response_format = response_format.value;
    if (speed.value) payload.speed = parseFloat(speed.value);

    // API endpoint URL
    const apiUrl = "https://api.openai.com/v1/audio/speech";

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key.value}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return `Error ${response.status}: ${errorData.error?.message || "Unknown error"}`;
        }

        // Convert response to blob (audio file)
        const audioBlob = await response.blob();

        // Return audio URL for playback
        const audioUrl = URL.createObjectURL(audioBlob);
        return audioUrl;

    } catch (error) {
        return `Error: Request failed - ${error.message}`;
    }
};
