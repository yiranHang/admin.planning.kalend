import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzTreeNode } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-system-role-view',
  templateUrl: './view.component.html'
})
export class SystemRoleViewComponent implements OnInit {
  @Input() data = [];

  @Output() readonly checkTreeChange = new EventEmitter();

  defaultCheckedKeys: string[] = [];
  searchValue = '';
  nodes: NzTreeNode[] = [];
  constructor(private http: _HttpClient) {}

  ngOnInit(): void {
    console.log('🚀 ~ SystemRoleViewComponent ~ this.data', this.data);

    this.http.get(`http://localhost:3000/dictionary-detail/tree-permissions`).subscribe(res => {
      this.nodes = res.data || [];
      this.defaultCheckedKeys = (this.data || []).map((r: Record<'id', string>) => r.id);
    });
  }
  getCheckLeafTree(checkTree: NzTreeNode[]) {
    const val: Array<Record<'id', string>> = [];
    const getLeaf = (tree: NzTreeNode[]) => {
      tree.map((r: NzTreeNode) => {
        if (r?.isLeaf) {
          val.push({ id: r.key });
        } else if (Array.isArray(r?.children)) {
          getLeaf(r.children as NzTreeNode[]);
        }
      });
    };
    checkTree.map((r: NzTreeNode) => {
      if (r?.origin?.isLeaf) {
        val.push({ id: r.origin.key });
      } else if (Array.isArray(r?.origin?.children)) {
        getLeaf(r.origin.children as NzTreeNode[]);
      }
    });
    return val;
  }

  checkBoxChange(tree: unknown) {
    const { checkedKeys } = tree as { checkedKeys: NzTreeNode[] };
    this.checkTreeChange.emit(this.getCheckLeafTree(checkedKeys));
  }
}
