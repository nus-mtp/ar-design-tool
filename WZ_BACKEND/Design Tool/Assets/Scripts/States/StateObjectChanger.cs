using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class StateObjectChanger : MonoBehaviour {

    const string SELECTOR_NAME = "Selector";
    const string TOGGLE_NAME = "StateChangeToggle";
    const string STATE_DROPDOWN_NAME = "StateDropDown";
    const string TRANSITION_STATE_NAME = "TransitionState";
    const string TRANSITION_STATE_DISPLAY = "Transition State id: ";
    const string NOT_TRANSITION = "not a state changer";

    private StateManager stateManager;
    private StateObject stateObject;
    private GameObject selector;
    private Text transitionStateText;
    private Toggle toggle;
    private Dropdown dropDown;

	// Use this for initialization
	void Awake () {
        GameObject controlScripts = GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
        stateManager = controlScripts.GetComponent<StateManager>();
	}
	
    public void AddStateObject(StateObject so)
    {
        stateObject = so;
        selector = transform.FindChild(SELECTOR_NAME).gameObject;
        Text name = selector.GetComponentInChildren<Text>();
        name.text = so.instanceName;
        transitionStateText = transform.FindChild(TRANSITION_STATE_NAME).gameObject.GetComponentInChildren<Text>();;


        if (stateObject.isStateChanger)
        {
            toggle = GetComponentInChildren<Toggle>();
            toggle.isOn = true;
            dropDown = GetComponentInChildren<Dropdown>();
            UpdateOptions();
            transitionStateText.text = TRANSITION_STATE_DISPLAY + so.transitionStateId;
        }
        else
        {
            transitionStateText.text = NOT_TRANSITION;
        }

    }

    public void UpdateOptions()
    {
        if (dropDown == null)
        {
            dropDown = GetComponentInChildren<Dropdown>();
        }
        dropDown.ClearOptions();
        dropDown.AddOptions(stateManager.GetStateNames());
    }

    public void SetStateChange()
    {
        if (dropDown == null)
        {
            dropDown = GetComponentInChildren<Dropdown>();
        }
         stateObject.transitionStateId = dropDown.value;
         if (toggle.isOn)
         {
             transitionStateText.text = TRANSITION_STATE_DISPLAY + stateObject.transitionStateId;
         }
    }

    public void SetIsStateChanger()
    {
        if (toggle == null)
        {
            toggle = GetComponentInChildren<Toggle>();
        }
        stateObject.isStateChanger = toggle.isOn;
        if (toggle.isOn)
        {
            transitionStateText.text = TRANSITION_STATE_DISPLAY + stateObject.transitionStateId;
        }
        else
        {
            transitionStateText.text = NOT_TRANSITION;
        }
    }

    public void SetActiveGameObject()
    {
        stateManager.SetActiveGameObject(stateObject.gameObject);
    }
}
