using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class ObjectCollection : MonoBehaviour{

    private List<GameObject> userObjects;
    private List<GameObject> inSceneObjects;
    private const string CURRENT_SELECTED_ITEM_TEXT = "Current Selected Item: ";

    public GameObject activeGameobject;
    public Text currentSelectedDisplay;
    public GameObject spawnButtonPrefab;

    private ObjectCollection()
    {
       
    }

    public int GetSize()
    {
        return userObjects.Count;
    }

    public List<GameObject> GetInSceneObjects()
    {
        List<GameObject> clone = new List<GameObject>();
        foreach (GameObject g in inSceneObjects)
        {
            clone.Add(g);
        }

        return clone;
    }

    public void SetActiveGameObject(GameObject o){
        if (inSceneObjects.Contains(o))
        {
            activeGameobject = o;
            currentSelectedDisplay.color = Color.black;
            currentSelectedDisplay.text =CURRENT_SELECTED_ITEM_TEXT +  o.name;
        }
    }

    public void SpawnObject(int i)
    {
        GameObject inScene = Instantiate(userObjects[i]);
        inScene.name = userObjects[i].name;
        inSceneObjects.Add(inScene);
        SetActiveGameObject(inScene);
    }

    public void AddGameObjects(GameObject o)
    {
        userObjects.Add(o);
    }

    public void RemoveActiveObject()
    {
        inSceneObjects.Remove(activeGameobject);
        Destroy(activeGameobject);
        currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT;
    }

    void Awake()
    {
        userObjects = new List<GameObject>();
        inSceneObjects = new List<GameObject>();
        LoadAssetBundle lab = gameObject.GetComponent<LoadAssetBundle>();
        lab.DownloadAndInstantiate();
    }


}
