using UnityEngine;
using System.Collections;

public class testdelete : MonoBehaviour {
    Facade facade;

    public int deleteId;
	// Use this for initialization
	void Start () {
        GameObject facadego = GameObject.FindGameObjectWithTag(Facade.FACADE_TAG);
        facade = facadego.GetComponent<Facade>();
	}

    public void Delete()
    {
        facade.SetTargetStateObject(deleteId);
        facade.DeleteGameObject();
    }
}
