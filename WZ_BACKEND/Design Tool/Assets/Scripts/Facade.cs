using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;

public class Facade : MonoBehaviour {
    public const string FACADE_TAG = "Facade";

    private LoadAssetBundle loadAssetBundle;
    private SaveProgress saveProgress;
    private LoadProgress loadProgress;
    private GameObject controlScript;
    private StateManager stateManager;
    private string assetBundleUrl;
    private string saveStateURL;
    private string loadStateURL;
	
    // Use this for initialization
	void Start () {
       controlScript =  GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
       loadAssetBundle = controlScript.GetComponent<LoadAssetBundle>();
       saveProgress = controlScript.GetComponent<SaveProgress>();
       loadProgress = controlScript.GetComponent<LoadProgress>();
       stateManager = controlScript.GetComponent<StateManager>();
	}

    public void SendStateInfo()
    {
        List<int> ids = stateManager.GetStateIDs();
        List<string> names = stateManager.GetStateNames();
        for (int i = 0; i < ids.Count; i++)
        {
            Application.ExternalCall("createState",ids[i],names[i]);
        }
    }

    public void AddNewState()
    {
        State newState = stateManager.AddNewState();
        Application.ExternalCall("createState", newState.id, newState.name);
    }

    public void DeleteState(int i)
    {
        stateManager.DeleteState(i);
    }

    public void DisplayState(int id)
    {
        stateManager.SwitchState(id);
    }

    public void ChangeStateName(string arg)
    {
        string[] arr = arg.Split(",".ToCharArray());
        int id = Int32.Parse(arr[0]);
        string newName = arr[1];
        Debug.Log(id);
        Debug.Log(newName);
        stateManager.ChangeStateName(id, newName);
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

    public void SaveProgress(string url)
    {
        saveProgress.Save(url);
    }


    public void SetTransformMode(string val)
    {
        Transformable.SetTransformMode(val);
    }
}
