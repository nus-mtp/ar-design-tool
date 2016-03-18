﻿using System.Collections.Generic;
using UnityEngine;

public class Facade : MonoBehaviour
{
    public const string FACADE_TAG = "Facade";

    private string assetBundleUrl;
    private GameObject controlScript;
    private LoadAssetBundle loadAssetBundle;
    private LoadProgress loadProgress;
    private string loadStateURL;
    private ModelCreator objectCollection;
    private SaveProgress saveProgress;
    private string saveStateURL;
    private StateManager stateManager;
    private int targetStateId;
    private int targetStateObjectId;
    private TextCreator textCreator;

    public void AddNewState()
    {
        State newState = stateManager.AddNewState();
        Application.ExternalCall("createState", newState.id, newState.name);
    }

    public void ChangeStateName(string newName)
    {
        stateManager.ChangeStateName(targetStateId, newName);
    }

    public void DeleteState()
    {
        stateManager.DeleteState(targetStateId);
    }

    public void DisplayState()
    {
        stateManager.SwitchState(targetStateId);
    }

    public void DownloadAssetBundle(string url)
    {
        assetBundleUrl = url;
        loadAssetBundle.DownloadAndInstantiate(url);
    }

    public void LoadProgress(string url)
    {
        loadProgress.Load(url);
    }

    public void RequestClickable()
    {
        List<StateObject> clickables = stateManager.RequestClickable(targetStateId);
        foreach (StateObject so in clickables)
        {
            Application.ExternalCall("AddClickable", so.instanceName, so.id, targetStateId);
        }
    }

    public void RequestModelInfo()
    {
        List<string> names = objectCollection.GetNames();
        foreach (string name in names)
        {
            Application.ExternalCall("addModelButton", name);
        }
    }

    public void SaveProgress(string url)
    {
        saveProgress.Save(url);
    }

    public void SendStateInfo()
    {
        List<int> ids = stateManager.GetStateIDs();
        List<string> names = stateManager.GetStateNames();
        for (int i = 0; i < ids.Count; i++)
        {
            Application.ExternalCall("createState", ids[i], names[i]);
        }
    }

    public void SetTargetState(int id)
    {
        targetStateId = id;
    }

    public void SetTargetStateObject(int id)
    {
        targetStateObjectId = id;
    }

    public void SetTransformMode(string val)
    {
        Transformable.SetTransformMode(val);
    }

    public void SetTransitionId(int transitionStateId)
    {
        stateManager.SetTransitionId(targetStateId, targetStateObjectId, transitionStateId);
    }

    public void SpawnObject(int i)
    {
        objectCollection.SpawnObject(i);
    }

    public void SpawnText(string input)
    {
        textCreator.CreateNewText(input);
    }

    public void UnSetTransitionId()
    {
        stateManager.UnSetTransitionId(targetStateId, targetStateObjectId);
    }

    // Use this for initialization
    private void Start()
    {
        controlScript = GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
        loadAssetBundle = controlScript.GetComponent<LoadAssetBundle>();
        objectCollection = controlScript.GetComponent<ModelCreator>();
        saveProgress = controlScript.GetComponent<SaveProgress>();
        loadProgress = controlScript.GetComponent<LoadProgress>();
        stateManager = controlScript.GetComponent<StateManager>();
        textCreator = controlScript.GetComponent<TextCreator>();
    }
}