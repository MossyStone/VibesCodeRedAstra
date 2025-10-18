from elevenlabs.client import ElevenLabs
from elevenlabs import save

# Initialize the ElevenLabs client with your API key
client = ElevenLabs(
    api_key="..."  # Replace with your actual API key
)

def text_to_speech(text, voice_id="21m00Tcm4TlvDq8ikWAM", output_file="output.mp3"):
    """
    Convert text to speech using ElevenLabs
    
    Args:
        text: The text to convert to speech
        voice_id: Voice ID to use (default: Rachel's ID)
        output_file: Path to save the audio file
    
    Common Voice IDs:
    - Rachel: 21m00Tcm4TlvDq8ikWAM
    - Josh: TxGEqnHWrfWFTfGW9XjX
    - Bella: EXAVITQu4vr4xnSDxMaL
    - Antoni: ErXwobaYiN019PkySvjV
    - Elli: MF3mGyEYCl7XYWbV9V6O
    - Sam: yoZ06aMxZJJ28mfd3POQ
    """
    try:
        # Generate audio
        audio = client.text_to_speech.convert(
            text=text,
            voice_id=voice_id
        )
        
        # Save audio to file
        save(audio, output_file)
        print(f"✓ Audio saved successfully to {output_file}")
        
    except Exception as e:
        print(f"✗ Error generating speech: {e}")

# Main execution
if __name__ == "__main__":
    # Example usage
    text = "Sssiixxxxxx seeeeevvveennnn"
    
    # Generate speech with Rachel's voice
    text_to_speech(text, voice_id="21m00Tcm4TlvDq8ikWAM", output_file="output.mp3")
    
    print("\n✓ All done! Check your audio file.")
