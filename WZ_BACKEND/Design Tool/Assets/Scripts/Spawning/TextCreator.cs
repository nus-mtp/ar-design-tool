using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class TextCreator : MonoBehaviour {

    public GameObject inputField;
    private const string TEXT_PREFAB_PATH = "New Text";
    private Text inputFieldComponent;
    private StateManager stateManager;
    private GameObject template;
    
    public void AddNewText(string input)
    {
        GameObject newText = Instantiate(template);
        TextMesh textComponent = newText.GetComponent<TextMesh>();
        textComponent.text = input;
        newText.AddComponent<BoxCollider>();
        newText.name = input;
        stateManager.AddToState(newText, StateObjectType.Text);
    }

    public GameObject LoadText(string input)
    {
        GameObject newText = Instantiate(template);
        TextMesh textComponent = newText.GetComponent<TextMesh>();
        textComponent.text = input;
        newText.AddComponent<BoxCollider>();
        newText.name = input;
        return newText;
    }

    public void CreateNewTextWrapper()
    {
        GameObject facadeGo = GameObject.FindGameObjectWithTag(Facade.FACADE_TAG);
        Facade facade = facadeGo.GetComponent<Facade>();
        facade.SpawnText(inputFieldComponent.text);
    }

    void Start()
    {
	    GameObject controlScripts = GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
        stateManager = controlScripts.GetComponent<StateManager>();
        template = (GameObject)Resources.Load(TEXT_PREFAB_PATH);
        inputFieldComponent = inputField.GetComponent<Text>();
	}
}
