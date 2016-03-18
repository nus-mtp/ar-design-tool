using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class ModelCreator : MonoBehaviour
{

    private List<GameObject> userObjects;
    private List<SpawnObjectWrapper> spawnButtons;
    private StateManager stateManager;

    public GameObject activeGameobject;
    public GameObject spawnButtonPrefab;
    public GameObject spawnButtonList;

    private ModelCreator()
    {

    }

    public List<string> GetNames()
    {
        List<string> result = new List<string>();
        foreach (GameObject g in userObjects)
        {
            result.Add(g.name);
        }
        return result;
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
            //AddMeshCollider(g);
            AttachScripts(g);
            GameObject modelButton = Instantiate(spawnButtonPrefab);
            modelButton.transform.SetParent(spawnButtonList.transform);
            Text buttonName = modelButton.GetComponentInChildren<Text>();
            buttonName.text = g.name;
            SpawnObjectWrapper spawn = modelButton.GetComponentInChildren<SpawnObjectWrapper>();
            spawnButtons.Add(spawn);
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
        go.AddComponent<Preview>();
    }

    public List<GameObject> GetUserObjects()
    {
        List<GameObject> clone = new List<GameObject>();
        foreach (GameObject g in userObjects)
        {
            clone.Add(g);
        }

        return clone;
    }

    public void SpawnObject(int i)
    {
        GameObject inScene = Instantiate(userObjects[i]);
        inScene.name = userObjects[i].name;
        stateManager.AddToState(inScene,StateObjectType.Model);
    }

    public void AddGameObjects(GameObject o)
    {
        userObjects.Add(o);
    }

    void Awake()
    {
        //userObjects = new List<GameObject>();
        stateManager = gameObject.GetComponent<StateManager>();
        spawnButtons = new List<SpawnObjectWrapper>();
        //LoadAssetBundle lab = gameObject.GetComponent<LoadAssetBundle>();
        //lab.DownloadAssetBundleTest();
    }


    internal void Init()
    {
        foreach (SpawnObjectWrapper s in spawnButtons)
        {
            Destroy(s.gameObject);
        }
        spawnButtons = new List<SpawnObjectWrapper>();
        userObjects = new List<GameObject>();
    }
}
