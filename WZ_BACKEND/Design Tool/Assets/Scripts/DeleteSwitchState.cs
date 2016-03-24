using UnityEngine;
using UnityEngine.UI;
using System;
using System.Collections;
using System.Collections.Generic;

public class DeleteSwitchState : MonoBehaviour {

    private StateManager stateManager;
    private Dropdown dropDown;
    private Facade facade;
	// Use this for initialization
	void Start () {
        GameObject controlScripts = GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
        stateManager = controlScripts.GetComponent<StateManager>();
        GameObject facadeGO = GameObject.FindGameObjectWithTag(Facade.FACADE_TAG);
        facade = facadeGO.GetComponent<Facade>();
	}

    public void DeleteSelectedScene()
    {
        int toDelete = GetIndex();
        facade.DeleteState(toDelete);
    }

    public void SwitchSelectedScene()
    {
        int toSwitch = GetIndex();
        facade.DisplayState(toSwitch);
    }

    private int GetIndex()
    {
        int dropDownIndex = dropDown.value;
        string strValue = dropDown.options[dropDownIndex].text;
        return Int32.Parse(strValue);
    }

    public void UpdateOptions()
    {
        if (dropDown == null)
        {
            dropDown = GetComponentInChildren<Dropdown>();
        }
        dropDown.ClearOptions();
        List<int> ids = stateManager.GetStateIDs();
        List<string> names = new List<string>();
        foreach (int i in ids)
        {
            names.Add(i.ToString());
        }
        dropDown.AddOptions(names);
    }
}
