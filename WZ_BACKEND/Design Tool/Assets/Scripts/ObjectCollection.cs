using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class ObjectCollection : MonoBehaviour
{

    private List<GameObject> userObjects;
    private List<GameObject> inSceneObjects;
    private const string CURRENT_SELECTED_ITEM_TEXT = "Current Selected Item: ";

    public GameObject activeGameobject;
    public Text currentSelectedDisplay;
    public GameObject spawnButtonPrefab;
    public GameObject spawnButtonList;

    private ObjectCollection()
    {

    }

    public int GetSize()
    {
        return userObjects.Count;
    }

    public void PrepareUserObjects()
    {
        int i=0;
        foreach (GameObject g in userObjects)
        {
            AddMeshCollider(g);
            AttachScripts(g);
            GameObject modelButton = Instantiate(spawnButtonPrefab);
            modelButton.transform.SetParent(spawnButtonList.transform);
            Text buttonName = modelButton.GetComponentInChildren<Text>();
            buttonName.text = g.name;
            SpawnObjectWrapper spawn = modelButton.GetComponentInChildren<SpawnObjectWrapper>();
            spawn.indexToSpawn = i;
            i++;
        }
    }

    private void AddMeshCollider(GameObject go)
    {
        MeshCollider[] meshColliders = go.GetComponentsInChildren<MeshCollider>();

        foreach (MeshCollider childCollider in meshColliders)
        {
            MeshCollider meshCollider = go.AddComponent<MeshCollider>();
            meshCollider.sharedMesh = childCollider.sharedMesh;
            childCollider.enabled = false;
        }

        
    }

    private void AttachScripts(GameObject go)
    {
        go.AddComponent<Transformable>();
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

    public void SetActiveGameObject(GameObject o)
    {
        if (inSceneObjects.Contains(o))
        {
            if (activeGameobject != null)
            {
                activeGameobject.GetComponent<Transformable>().destroyElements();
            }
            activeGameobject = o;
            activeGameobject.GetComponent<Transformable>().initializeObjects();
            currentSelectedDisplay.color = Color.black;
            currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT + o.name;
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
        activeGameobject.GetComponent<Transformable>().destroyElements();
        inSceneObjects.Remove(activeGameobject);
        Destroy(activeGameobject);
        currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT;
    }

    public void spawnLoadedState(State state)
    {
        foreach (StateObject s in state.stateObjects)
        {
            foreach (GameObject g in userObjects)
            {
                if (g.name.Equals(s.modelName))
                {
                    GameObject toSpawn = Instantiate(g);
                    s.InitializeGameObject(toSpawn);
                    inSceneObjects.Add(toSpawn);
                    SetActiveGameObject(toSpawn);
                }
            }
        }
    }

    void Awake()
    {
        userObjects = new List<GameObject>();
        inSceneObjects = new List<GameObject>();
        LoadAssetBundle lab = gameObject.GetComponent<LoadAssetBundle>();
        lab.DownloadAndInstantiate();
    }

}
