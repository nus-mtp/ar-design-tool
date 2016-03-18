using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class TextCreator : MonoBehaviour {

    private const string TEXT_PREFAB_PATH = "New Text";
    private StateManager stateManager;
    private GameObject template;
    private Text inputFieldComponent;

    public GameObject inputField;
	// Use this for initialization
	void Start () {
	    GameObject controlScripts = GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
        stateManager = controlScripts.GetComponent<StateManager>();
        template = (GameObject)Resources.Load(TEXT_PREFAB_PATH);
        inputFieldComponent = inputField.GetComponent<Text>();
	}

    public void CreateNewText(string input){
        GameObject newText = Instantiate(template);
        TextMesh textComponent = newText.GetComponent<TextMesh>();
        textComponent.text = input;
        newText.AddComponent<BoxCollider>();
        newText.AddComponent<Transformable>();
        newText.name = input;
        stateManager.AddToState(newText,StateObjectType.Text);
    }

    public void CreateNewTextWrapper()
    {
        GameObject facadeGo = GameObject.FindGameObjectWithTag(Facade.FACADE_TAG);
        Facade facade = facadeGo.GetComponent<Facade>();
        facade.SpawnText(inputFieldComponent.text);
    }
}
