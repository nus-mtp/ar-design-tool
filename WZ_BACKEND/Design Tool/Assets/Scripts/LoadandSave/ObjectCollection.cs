using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class ObjectCollection : MonoBehaviour
{

    private List<GameObject> userObjects;
    private StateManager stateManager;

    public GameObject activeGameobject;
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
            //AddMeshCollider(g);
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
        stateManager.AddToState(inScene);
    }

    public void AddGameObjects(GameObject o)
    {
        userObjects.Add(o);
    }

    void Awake()
    {
        userObjects = new List<GameObject>();
        stateManager = gameObject.GetComponent<StateManager>();
        //LoadAssetBundle lab = gameObject.GetComponent<LoadAssetBundle>();
        //lab.DownloadAssetBundleTest();
    }

}
